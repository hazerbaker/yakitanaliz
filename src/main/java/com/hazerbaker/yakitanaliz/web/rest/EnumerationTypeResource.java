package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.service.EnumerationTypeService;
import com.hazerbaker.yakitanaliz.web.rest.errors.BadRequestAlertException;
import com.hazerbaker.yakitanaliz.web.rest.util.HeaderUtil;
import com.hazerbaker.yakitanaliz.web.rest.util.PaginationUtil;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationTypeDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EnumerationType.
 */
@RestController
@RequestMapping("/api")
public class EnumerationTypeResource {

    private final Logger log = LoggerFactory.getLogger(EnumerationTypeResource.class);

    private static final String ENTITY_NAME = "enumerationType";

    private final EnumerationTypeService enumerationTypeService;

    public EnumerationTypeResource(EnumerationTypeService enumerationTypeService) {
        this.enumerationTypeService = enumerationTypeService;
    }

    /**
     * POST  /enumeration-types : Create a new enumerationType.
     *
     * @param enumerationTypeDTO the enumerationTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enumerationTypeDTO, or with status 400 (Bad Request) if the enumerationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enumeration-types")
    @Timed
    public ResponseEntity<EnumerationTypeDTO> createEnumerationType(@RequestBody EnumerationTypeDTO enumerationTypeDTO) throws URISyntaxException {
        log.debug("REST request to save EnumerationType : {}", enumerationTypeDTO);
        if (enumerationTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new enumerationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnumerationTypeDTO result = enumerationTypeService.save(enumerationTypeDTO);
        return ResponseEntity.created(new URI("/api/enumeration-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enumeration-types : Updates an existing enumerationType.
     *
     * @param enumerationTypeDTO the enumerationTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enumerationTypeDTO,
     * or with status 400 (Bad Request) if the enumerationTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the enumerationTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enumeration-types")
    @Timed
    public ResponseEntity<EnumerationTypeDTO> updateEnumerationType(@RequestBody EnumerationTypeDTO enumerationTypeDTO) throws URISyntaxException {
        log.debug("REST request to update EnumerationType : {}", enumerationTypeDTO);
        if (enumerationTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnumerationTypeDTO result = enumerationTypeService.save(enumerationTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enumerationTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enumeration-types : get all the enumerationTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enumerationTypes in body
     */
    @GetMapping("/enumeration-types")
    @Timed
    public ResponseEntity<List<EnumerationTypeDTO>> getAllEnumerationTypes(Pageable pageable) {
        log.debug("REST request to get a page of EnumerationTypes");
        Page<EnumerationTypeDTO> page = enumerationTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enumeration-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /enumeration-types/:id : get the "id" enumerationType.
     *
     * @param id the id of the enumerationTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enumerationTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/enumeration-types/{id}")
    @Timed
    public ResponseEntity<EnumerationTypeDTO> getEnumerationType(@PathVariable Long id) {
        log.debug("REST request to get EnumerationType : {}", id);
        Optional<EnumerationTypeDTO> enumerationTypeDTO = enumerationTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(enumerationTypeDTO);
    }

    /**
     * DELETE  /enumeration-types/:id : delete the "id" enumerationType.
     *
     * @param id the id of the enumerationTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enumeration-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnumerationType(@PathVariable Long id) {
        log.debug("REST request to delete EnumerationType : {}", id);
        enumerationTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
