package com.hazerbaker.yakitanaliz.service;

import com.hazerbaker.yakitanaliz.service.dto.EnumerationDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Enumeration.
 */
public interface EnumerationService {

    /**
     * Save a enumeration.
     *
     * @param enumerationDTO the entity to save
     * @return the persisted entity
     */
    EnumerationDTO save(EnumerationDTO enumerationDTO);

    /**
     * Get all the enumerations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EnumerationDTO> findAll(Pageable pageable);


    /**
     * Get the "id" enumeration.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EnumerationDTO> findOne(Long id);

    /**
     * Delete the "id" enumeration.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
