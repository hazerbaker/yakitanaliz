package com.hazerbaker.yakitanaliz.service.impl;

import com.hazerbaker.yakitanaliz.service.FillUpService;
import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;
import com.hazerbaker.yakitanaliz.service.dto.FillUpDTO;
import com.hazerbaker.yakitanaliz.service.mapper.FillUpMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing FillUp.
 */
@Service
@Transactional
public class FillUpServiceImpl implements FillUpService {

    private final Logger log = LoggerFactory.getLogger(FillUpServiceImpl.class);

    private final FillUpRepository fillUpRepository;

    private final FillUpMapper fillUpMapper;

    public FillUpServiceImpl(FillUpRepository fillUpRepository, FillUpMapper fillUpMapper) {
        this.fillUpRepository = fillUpRepository;
        this.fillUpMapper = fillUpMapper;
    }

    /**
     * Save a fillUp.
     *
     * @param fillUpDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FillUpDTO save(FillUpDTO fillUpDTO) {
        log.debug("Request to save FillUp : {}", fillUpDTO);
        FillUp fillUp = fillUpMapper.toEntity(fillUpDTO);
        fillUp = fillUpRepository.save(fillUp);
        return fillUpMapper.toDto(fillUp);
    }

    /**
     * Get all the fillUps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FillUpDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FillUps");
        return fillUpRepository.findAll(pageable)
            .map(fillUpMapper::toDto);
    }


    /**
     * Get one fillUp by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FillUpDTO> findOne(Long id) {
        log.debug("Request to get FillUp : {}", id);
        return fillUpRepository.findById(id)
            .map(fillUpMapper::toDto);
    }

    /**
     * Delete the fillUp by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FillUp : {}", id);
        fillUpRepository.deleteById(id);
    }
}
