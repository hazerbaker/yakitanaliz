package com.hazerbaker.yakitanaliz.web.rest;

import com.hazerbaker.yakitanaliz.YakitanalizApp;

import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;
import com.hazerbaker.yakitanaliz.service.FillUpService;
import com.hazerbaker.yakitanaliz.service.dto.FillUpDTO;
import com.hazerbaker.yakitanaliz.service.mapper.FillUpMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.hazerbaker.yakitanaliz.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FillUpResource REST controller.
 *
 * @see FillUpResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = YakitanalizApp.class)
public class FillUpResourceIntTest {

    private static final Double DEFAULT_QUANTITY = 1D;
    private static final Double UPDATED_QUANTITY = 2D;

    private static final Double DEFAULT_UNIT_PRICE = 1D;
    private static final Double UPDATED_UNIT_PRICE = 2D;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_TOTAL_DISTANCE = 1;
    private static final Integer UPDATED_TOTAL_DISTANCE = 2;

    private static final Integer DEFAULT_DISTANCE = 1;
    private static final Integer UPDATED_DISTANCE = 2;

    @Autowired
    private FillUpRepository fillUpRepository;


    @Autowired
    private FillUpMapper fillUpMapper;
    

    @Autowired
    private FillUpService fillUpService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFillUpMockMvc;

    private FillUp fillUp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FillUpResource fillUpResource = new FillUpResource(fillUpService);
        this.restFillUpMockMvc = MockMvcBuilders.standaloneSetup(fillUpResource)
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
    public static FillUp createEntity(EntityManager em) {
        FillUp fillUp = new FillUp()
            .quantity(DEFAULT_QUANTITY)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .date(DEFAULT_DATE)
            .totalDistance(DEFAULT_TOTAL_DISTANCE)
            .distance(DEFAULT_DISTANCE);
        return fillUp;
    }

    @Before
    public void initTest() {
        fillUp = createEntity(em);
    }

    @Test
    @Transactional
    public void createFillUp() throws Exception {
        int databaseSizeBeforeCreate = fillUpRepository.findAll().size();

        // Create the FillUp
        FillUpDTO fillUpDTO = fillUpMapper.toDto(fillUp);
        restFillUpMockMvc.perform(post("/api/fill-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fillUpDTO)))
            .andExpect(status().isCreated());

        // Validate the FillUp in the database
        List<FillUp> fillUpList = fillUpRepository.findAll();
        assertThat(fillUpList).hasSize(databaseSizeBeforeCreate + 1);
        FillUp testFillUp = fillUpList.get(fillUpList.size() - 1);
        assertThat(testFillUp.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testFillUp.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testFillUp.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testFillUp.getTotalDistance()).isEqualTo(DEFAULT_TOTAL_DISTANCE);
        assertThat(testFillUp.getDistance()).isEqualTo(DEFAULT_DISTANCE);
    }

    @Test
    @Transactional
    public void createFillUpWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fillUpRepository.findAll().size();

        // Create the FillUp with an existing ID
        fillUp.setId(1L);
        FillUpDTO fillUpDTO = fillUpMapper.toDto(fillUp);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFillUpMockMvc.perform(post("/api/fill-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fillUpDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FillUp in the database
        List<FillUp> fillUpList = fillUpRepository.findAll();
        assertThat(fillUpList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFillUps() throws Exception {
        // Initialize the database
        fillUpRepository.saveAndFlush(fillUp);

        // Get all the fillUpList
        restFillUpMockMvc.perform(get("/api/fill-ups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fillUp.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalDistance").value(hasItem(DEFAULT_TOTAL_DISTANCE)))
            .andExpect(jsonPath("$.[*].distance").value(hasItem(DEFAULT_DISTANCE)));
    }
    

    @Test
    @Transactional
    public void getFillUp() throws Exception {
        // Initialize the database
        fillUpRepository.saveAndFlush(fillUp);

        // Get the fillUp
        restFillUpMockMvc.perform(get("/api/fill-ups/{id}", fillUp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fillUp.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.totalDistance").value(DEFAULT_TOTAL_DISTANCE))
            .andExpect(jsonPath("$.distance").value(DEFAULT_DISTANCE));
    }
    @Test
    @Transactional
    public void getNonExistingFillUp() throws Exception {
        // Get the fillUp
        restFillUpMockMvc.perform(get("/api/fill-ups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFillUp() throws Exception {
        // Initialize the database
        fillUpRepository.saveAndFlush(fillUp);

        int databaseSizeBeforeUpdate = fillUpRepository.findAll().size();

        // Update the fillUp
        FillUp updatedFillUp = fillUpRepository.findById(fillUp.getId()).get();
        // Disconnect from session so that the updates on updatedFillUp are not directly saved in db
        em.detach(updatedFillUp);
        updatedFillUp
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE)
            .date(UPDATED_DATE)
            .totalDistance(UPDATED_TOTAL_DISTANCE)
            .distance(UPDATED_DISTANCE);
        FillUpDTO fillUpDTO = fillUpMapper.toDto(updatedFillUp);

        restFillUpMockMvc.perform(put("/api/fill-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fillUpDTO)))
            .andExpect(status().isOk());

        // Validate the FillUp in the database
        List<FillUp> fillUpList = fillUpRepository.findAll();
        assertThat(fillUpList).hasSize(databaseSizeBeforeUpdate);
        FillUp testFillUp = fillUpList.get(fillUpList.size() - 1);
        assertThat(testFillUp.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testFillUp.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testFillUp.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testFillUp.getTotalDistance()).isEqualTo(UPDATED_TOTAL_DISTANCE);
        assertThat(testFillUp.getDistance()).isEqualTo(UPDATED_DISTANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingFillUp() throws Exception {
        int databaseSizeBeforeUpdate = fillUpRepository.findAll().size();

        // Create the FillUp
        FillUpDTO fillUpDTO = fillUpMapper.toDto(fillUp);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFillUpMockMvc.perform(put("/api/fill-ups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fillUpDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FillUp in the database
        List<FillUp> fillUpList = fillUpRepository.findAll();
        assertThat(fillUpList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFillUp() throws Exception {
        // Initialize the database
        fillUpRepository.saveAndFlush(fillUp);

        int databaseSizeBeforeDelete = fillUpRepository.findAll().size();

        // Get the fillUp
        restFillUpMockMvc.perform(delete("/api/fill-ups/{id}", fillUp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FillUp> fillUpList = fillUpRepository.findAll();
        assertThat(fillUpList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FillUp.class);
        FillUp fillUp1 = new FillUp();
        fillUp1.setId(1L);
        FillUp fillUp2 = new FillUp();
        fillUp2.setId(fillUp1.getId());
        assertThat(fillUp1).isEqualTo(fillUp2);
        fillUp2.setId(2L);
        assertThat(fillUp1).isNotEqualTo(fillUp2);
        fillUp1.setId(null);
        assertThat(fillUp1).isNotEqualTo(fillUp2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FillUpDTO.class);
        FillUpDTO fillUpDTO1 = new FillUpDTO();
        fillUpDTO1.setId(1L);
        FillUpDTO fillUpDTO2 = new FillUpDTO();
        assertThat(fillUpDTO1).isNotEqualTo(fillUpDTO2);
        fillUpDTO2.setId(fillUpDTO1.getId());
        assertThat(fillUpDTO1).isEqualTo(fillUpDTO2);
        fillUpDTO2.setId(2L);
        assertThat(fillUpDTO1).isNotEqualTo(fillUpDTO2);
        fillUpDTO1.setId(null);
        assertThat(fillUpDTO1).isNotEqualTo(fillUpDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fillUpMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fillUpMapper.fromId(null)).isNull();
    }
}
