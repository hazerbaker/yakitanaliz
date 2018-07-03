package com.hazerbaker.yakitanaliz.web.rest;

import com.hazerbaker.yakitanaliz.YakitanalizApp;

import com.hazerbaker.yakitanaliz.domain.EnumerationType;
import com.hazerbaker.yakitanaliz.repository.EnumerationTypeRepository;
import com.hazerbaker.yakitanaliz.service.EnumerationTypeService;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationTypeDTO;
import com.hazerbaker.yakitanaliz.service.mapper.EnumerationTypeMapper;
import com.hazerbaker.yakitanaliz.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.hazerbaker.yakitanaliz.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EnumerationTypeResource REST controller.
 *
 * @see EnumerationTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YakitanalizApp.class)
public class EnumerationTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EnumerationTypeRepository enumerationTypeRepository;


    @Autowired
    private EnumerationTypeMapper enumerationTypeMapper;
    

    @Autowired
    private EnumerationTypeService enumerationTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnumerationTypeMockMvc;

    private EnumerationType enumerationType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnumerationTypeResource enumerationTypeResource = new EnumerationTypeResource(enumerationTypeService);
        this.restEnumerationTypeMockMvc = MockMvcBuilders.standaloneSetup(enumerationTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EnumerationType createEntity(EntityManager em) {
        EnumerationType enumerationType = new EnumerationType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return enumerationType;
    }

    @Before
    public void initTest() {
        enumerationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnumerationType() throws Exception {
        int databaseSizeBeforeCreate = enumerationTypeRepository.findAll().size();

        // Create the EnumerationType
        EnumerationTypeDTO enumerationTypeDTO = enumerationTypeMapper.toDto(enumerationType);
        restEnumerationTypeMockMvc.perform(post("/api/enumeration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the EnumerationType in the database
        List<EnumerationType> enumerationTypeList = enumerationTypeRepository.findAll();
        assertThat(enumerationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        EnumerationType testEnumerationType = enumerationTypeList.get(enumerationTypeList.size() - 1);
        assertThat(testEnumerationType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEnumerationType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createEnumerationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enumerationTypeRepository.findAll().size();

        // Create the EnumerationType with an existing ID
        enumerationType.setId(1L);
        EnumerationTypeDTO enumerationTypeDTO = enumerationTypeMapper.toDto(enumerationType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnumerationTypeMockMvc.perform(post("/api/enumeration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EnumerationType in the database
        List<EnumerationType> enumerationTypeList = enumerationTypeRepository.findAll();
        assertThat(enumerationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnumerationTypes() throws Exception {
        // Initialize the database
        enumerationTypeRepository.saveAndFlush(enumerationType);

        // Get all the enumerationTypeList
        restEnumerationTypeMockMvc.perform(get("/api/enumeration-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enumerationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getEnumerationType() throws Exception {
        // Initialize the database
        enumerationTypeRepository.saveAndFlush(enumerationType);

        // Get the enumerationType
        restEnumerationTypeMockMvc.perform(get("/api/enumeration-types/{id}", enumerationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enumerationType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEnumerationType() throws Exception {
        // Get the enumerationType
        restEnumerationTypeMockMvc.perform(get("/api/enumeration-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnumerationType() throws Exception {
        // Initialize the database
        enumerationTypeRepository.saveAndFlush(enumerationType);

        int databaseSizeBeforeUpdate = enumerationTypeRepository.findAll().size();

        // Update the enumerationType
        EnumerationType updatedEnumerationType = enumerationTypeRepository.findById(enumerationType.getId()).get();
        // Disconnect from session so that the updates on updatedEnumerationType are not directly saved in db
        em.detach(updatedEnumerationType);
        updatedEnumerationType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        EnumerationTypeDTO enumerationTypeDTO = enumerationTypeMapper.toDto(updatedEnumerationType);

        restEnumerationTypeMockMvc.perform(put("/api/enumeration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationTypeDTO)))
            .andExpect(status().isOk());

        // Validate the EnumerationType in the database
        List<EnumerationType> enumerationTypeList = enumerationTypeRepository.findAll();
        assertThat(enumerationTypeList).hasSize(databaseSizeBeforeUpdate);
        EnumerationType testEnumerationType = enumerationTypeList.get(enumerationTypeList.size() - 1);
        assertThat(testEnumerationType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEnumerationType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingEnumerationType() throws Exception {
        int databaseSizeBeforeUpdate = enumerationTypeRepository.findAll().size();

        // Create the EnumerationType
        EnumerationTypeDTO enumerationTypeDTO = enumerationTypeMapper.toDto(enumerationType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnumerationTypeMockMvc.perform(put("/api/enumeration-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EnumerationType in the database
        List<EnumerationType> enumerationTypeList = enumerationTypeRepository.findAll();
        assertThat(enumerationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnumerationType() throws Exception {
        // Initialize the database
        enumerationTypeRepository.saveAndFlush(enumerationType);

        int databaseSizeBeforeDelete = enumerationTypeRepository.findAll().size();

        // Get the enumerationType
        restEnumerationTypeMockMvc.perform(delete("/api/enumeration-types/{id}", enumerationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EnumerationType> enumerationTypeList = enumerationTypeRepository.findAll();
        assertThat(enumerationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnumerationType.class);
        EnumerationType enumerationType1 = new EnumerationType();
        enumerationType1.setId(1L);
        EnumerationType enumerationType2 = new EnumerationType();
        enumerationType2.setId(enumerationType1.getId());
        assertThat(enumerationType1).isEqualTo(enumerationType2);
        enumerationType2.setId(2L);
        assertThat(enumerationType1).isNotEqualTo(enumerationType2);
        enumerationType1.setId(null);
        assertThat(enumerationType1).isNotEqualTo(enumerationType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnumerationTypeDTO.class);
        EnumerationTypeDTO enumerationTypeDTO1 = new EnumerationTypeDTO();
        enumerationTypeDTO1.setId(1L);
        EnumerationTypeDTO enumerationTypeDTO2 = new EnumerationTypeDTO();
        assertThat(enumerationTypeDTO1).isNotEqualTo(enumerationTypeDTO2);
        enumerationTypeDTO2.setId(enumerationTypeDTO1.getId());
        assertThat(enumerationTypeDTO1).isEqualTo(enumerationTypeDTO2);
        enumerationTypeDTO2.setId(2L);
        assertThat(enumerationTypeDTO1).isNotEqualTo(enumerationTypeDTO2);
        enumerationTypeDTO1.setId(null);
        assertThat(enumerationTypeDTO1).isNotEqualTo(enumerationTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enumerationTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enumerationTypeMapper.fromId(null)).isNull();
    }
}
