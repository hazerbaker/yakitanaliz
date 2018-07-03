package com.hazerbaker.yakitanaliz.service.impl;

import com.hazerbaker.yakitanaliz.service.EnumerationTypeService;
import com.hazerbaker.yakitanaliz.domain.EnumerationType;
import com.hazerbaker.yakitanaliz.repository.EnumerationTypeRepository;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationTypeDTO;
import com.hazerbaker.yakitanaliz.service.mapper.EnumerationTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing EnumerationType.
 */
@Service
@Transactional
public class EnumerationTypeServiceImpl implements EnumerationTypeService {

    private final Logger log = LoggerFactory.getLogger(EnumerationTypeServiceImpl.class);

    private final EnumerationTypeRepository enumerationTypeRepository;

    private final EnumerationTypeMapper enumerationTypeMapper;

    public EnumerationTypeServiceImpl(EnumerationTypeRepository enumerationTypeRepository, EnumerationTypeMapper enumerationTypeMapper) {
        this.enumerationTypeRepository = enumerationTypeRepository;
        this.enumerationTypeMapper = enumerationTypeMapper;
    }

    /**
     * Save a enumerationType.
     *
     * @param enumerationTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EnumerationTypeDTO save(EnumerationTypeDTO enumerationTypeDTO) {
        log.debug("Request to save EnumerationType : {}", enumerationTypeDTO);
        EnumerationType enumerationType = enumerationTypeMapper.toEntity(enumerationTypeDTO);
        enumerationType = enumerationTypeRepository.save(enumerationType);
        return enumerationTypeMapper.toDto(enumerationType);
    }

    /**
     * Get all the enumerationTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EnumerationTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EnumerationTypes");
        return enumerationTypeRepository.findAll(pageable)
            .map(enumerationTypeMapper::toDto);
    }


    /**
     * Get one enumerationType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EnumerationTypeDTO> findOne(Long id) {
        log.debug("Request to get EnumerationType : {}", id);
        return enumerationTypeRepository.findById(id)
            .map(enumerationTypeMapper::toDto);
    }

    /**
     * Delete the enumerationType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EnumerationType : {}", id);
        enumerationTypeRepository.deleteById(id);
    }
}
