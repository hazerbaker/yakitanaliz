package com.hazerbaker.yakitanaliz.service.impl;

import com.hazerbaker.yakitanaliz.service.EnumerationService;
import com.hazerbaker.yakitanaliz.domain.Enumeration;
import com.hazerbaker.yakitanaliz.repository.EnumerationRepository;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationDTO;
import com.hazerbaker.yakitanaliz.service.mapper.EnumerationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Enumeration.
 */
@Service
@Transactional
public class EnumerationServiceImpl implements EnumerationService {

    private final Logger log = LoggerFactory.getLogger(EnumerationServiceImpl.class);

    private final EnumerationRepository enumerationRepository;

    private final EnumerationMapper enumerationMapper;

    public EnumerationServiceImpl(EnumerationRepository enumerationRepository, EnumerationMapper enumerationMapper) {
        this.enumerationRepository = enumerationRepository;
        this.enumerationMapper = enumerationMapper;
    }

    /**
     * Save a enumeration.
     *
     * @param enumerationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EnumerationDTO save(EnumerationDTO enumerationDTO) {
        log.debug("Request to save Enumeration : {}", enumerationDTO);
        Enumeration enumeration = enumerationMapper.toEntity(enumerationDTO);
        enumeration = enumerationRepository.save(enumeration);
        return enumerationMapper.toDto(enumeration);
    }

    /**
     * Get all the enumerations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EnumerationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Enumerations");
        return enumerationRepository.findAll(pageable)
            .map(enumerationMapper::toDto);
    }


    /**
     * Get one enumeration by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EnumerationDTO> findOne(Long id) {
        log.debug("Request to get Enumeration : {}", id);
        return enumerationRepository.findById(id)
            .map(enumerationMapper::toDto);
    }

    /**
     * Delete the enumeration by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enumeration : {}", id);
        enumerationRepository.deleteById(id);
    }
}
