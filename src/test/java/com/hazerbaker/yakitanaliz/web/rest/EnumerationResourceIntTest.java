package com.hazerbaker.yakitanaliz.web.rest;

import com.hazerbaker.yakitanaliz.YakitanalizApp;

import com.hazerbaker.yakitanaliz.domain.Enumeration;
import com.hazerbaker.yakitanaliz.repository.EnumerationRepository;
import com.hazerbaker.yakitanaliz.service.EnumerationService;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationDTO;
import com.hazerbaker.yakitanaliz.service.mapper.EnumerationMapper;
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
 * Test class for the EnumerationResource REST controller.
 *
 * @see EnumerationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YakitanalizApp.class)
public class EnumerationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EnumerationRepository enumerationRepository;


    @Autowired
    private EnumerationMapper enumerationMapper;
    

    @Autowired
    private EnumerationService enumerationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEnumerationMockMvc;

    private Enumeration enumeration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnumerationResource enumerationResource = new EnumerationResource(enumerationService);
        this.restEnumerationMockMvc = MockMvcBuilders.standaloneSetup(enumerationResource)
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
    public static Enumeration createEntity(EntityManager em) {
        Enumeration enumeration = new Enumeration()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return enumeration;
    }

    @Before
    public void initTest() {
        enumeration = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnumeration() throws Exception {
        int databaseSizeBeforeCreate = enumerationRepository.findAll().size();

        // Create the Enumeration
        EnumerationDTO enumerationDTO = enumerationMapper.toDto(enumeration);
        restEnumerationMockMvc.perform(post("/api/enumerations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationDTO)))
            .andExpect(status().isCreated());

        // Validate the Enumeration in the database
        List<Enumeration> enumerationList = enumerationRepository.findAll();
        assertThat(enumerationList).hasSize(databaseSizeBeforeCreate + 1);
        Enumeration testEnumeration = enumerationList.get(enumerationList.size() - 1);
        assertThat(testEnumeration.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEnumeration.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createEnumerationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enumerationRepository.findAll().size();

        // Create the Enumeration with an existing ID
        enumeration.setId(1L);
        EnumerationDTO enumerationDTO = enumerationMapper.toDto(enumeration);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnumerationMockMvc.perform(post("/api/enumerations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enumeration in the database
        List<Enumeration> enumerationList = enumerationRepository.findAll();
        assertThat(enumerationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEnumerations() throws Exception {
        // Initialize the database
        enumerationRepository.saveAndFlush(enumeration);

        // Get all the enumerationList
        restEnumerationMockMvc.perform(get("/api/enumerations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enumeration.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getEnumeration() throws Exception {
        // Initialize the database
        enumerationRepository.saveAndFlush(enumeration);

        // Get the enumeration
        restEnumerationMockMvc.perform(get("/api/enumerations/{id}", enumeration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enumeration.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEnumeration() throws Exception {
        // Get the enumeration
        restEnumerationMockMvc.perform(get("/api/enumerations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnumeration() throws Exception {
        // Initialize the database
        enumerationRepository.saveAndFlush(enumeration);

        int databaseSizeBeforeUpdate = enumerationRepository.findAll().size();

        // Update the enumeration
        Enumeration updatedEnumeration = enumerationRepository.findById(enumeration.getId()).get();
        // Disconnect from session so that the updates on updatedEnumeration are not directly saved in db
        em.detach(updatedEnumeration);
        updatedEnumeration
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        EnumerationDTO enumerationDTO = enumerationMapper.toDto(updatedEnumeration);

        restEnumerationMockMvc.perform(put("/api/enumerations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationDTO)))
            .andExpect(status().isOk());

        // Validate the Enumeration in the database
        List<Enumeration> enumerationList = enumerationRepository.findAll();
        assertThat(enumerationList).hasSize(databaseSizeBeforeUpdate);
        Enumeration testEnumeration = enumerationList.get(enumerationList.size() - 1);
        assertThat(testEnumeration.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEnumeration.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingEnumeration() throws Exception {
        int databaseSizeBeforeUpdate = enumerationRepository.findAll().size();

        // Create the Enumeration
        EnumerationDTO enumerationDTO = enumerationMapper.toDto(enumeration);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEnumerationMockMvc.perform(put("/api/enumerations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumerationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enumeration in the database
        List<Enumeration> enumerationList = enumerationRepository.findAll();
        assertThat(enumerationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnumeration() throws Exception {
        // Initialize the database
        enumerationRepository.saveAndFlush(enumeration);

        int databaseSizeBeforeDelete = enumerationRepository.findAll().size();

        // Get the enumeration
        restEnumerationMockMvc.perform(delete("/api/enumerations/{id}", enumeration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Enumeration> enumerationList = enumerationRepository.findAll();
        assertThat(enumerationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enumeration.class);
        Enumeration enumeration1 = new Enumeration();
        enumeration1.setId(1L);
        Enumeration enumeration2 = new Enumeration();
        enumeration2.setId(enumeration1.getId());
        assertThat(enumeration1).isEqualTo(enumeration2);
        enumeration2.setId(2L);
        assertThat(enumeration1).isNotEqualTo(enumeration2);
        enumeration1.setId(null);
        assertThat(enumeration1).isNotEqualTo(enumeration2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnumerationDTO.class);
        EnumerationDTO enumerationDTO1 = new EnumerationDTO();
        enumerationDTO1.setId(1L);
        EnumerationDTO enumerationDTO2 = new EnumerationDTO();
        assertThat(enumerationDTO1).isNotEqualTo(enumerationDTO2);
        enumerationDTO2.setId(enumerationDTO1.getId());
        assertThat(enumerationDTO1).isEqualTo(enumerationDTO2);
        enumerationDTO2.setId(2L);
        assertThat(enumerationDTO1).isNotEqualTo(enumerationDTO2);
        enumerationDTO1.setId(null);
        assertThat(enumerationDTO1).isNotEqualTo(enumerationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enumerationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enumerationMapper.fromId(null)).isNull();
    }
}
