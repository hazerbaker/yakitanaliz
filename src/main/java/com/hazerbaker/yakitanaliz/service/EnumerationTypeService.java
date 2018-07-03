package com.hazerbaker.yakitanaliz.service;

import com.hazerbaker.yakitanaliz.service.dto.EnumerationTypeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing EnumerationType.
 */
public interface EnumerationTypeService {

    /**
     * Save a enumerationType.
     *
     * @param enumerationTypeDTO the entity to save
     * @return the persisted entity
     */
    EnumerationTypeDTO save(EnumerationTypeDTO enumerationTypeDTO);

    /**
     * Get all the enumerationTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EnumerationTypeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" enumerationType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EnumerationTypeDTO> findOne(Long id);

    /**
     * Delete the "id" enumerationType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
