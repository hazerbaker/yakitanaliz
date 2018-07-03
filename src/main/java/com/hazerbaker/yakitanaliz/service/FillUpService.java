package com.hazerbaker.yakitanaliz.service;

import com.hazerbaker.yakitanaliz.service.dto.FillUpDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing FillUp.
 */
public interface FillUpService {

    /**
     * Save a fillUp.
     *
     * @param fillUpDTO the entity to save
     * @return the persisted entity
     */
    FillUpDTO save(FillUpDTO fillUpDTO);

    /**
     * Get all the fillUps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FillUpDTO> findAll(Pageable pageable);


    /**
     * Get the "id" fillUp.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FillUpDTO> findOne(Long id);

    /**
     * Delete the "id" fillUp.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
