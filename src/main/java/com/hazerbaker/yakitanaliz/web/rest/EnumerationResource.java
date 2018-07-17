package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.domain.Enumeration;
import com.hazerbaker.yakitanaliz.domain.enumeration.EnumerationType;
import com.hazerbaker.yakitanaliz.repository.EnumerationRepository;
import com.hazerbaker.yakitanaliz.web.rest.errors.BadRequestAlertException;
import com.hazerbaker.yakitanaliz.web.rest.util.HeaderUtil;
import com.hazerbaker.yakitanaliz.web.rest.util.PaginationUtil;
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
 * REST controller for managing Enumeration.
 */
@RestController
@RequestMapping("/api")
public class EnumerationResource {

    private final Logger log = LoggerFactory.getLogger(EnumerationResource.class);

    private static final String ENTITY_NAME = "enumeration";

    private final EnumerationRepository enumerationRepository;

    public EnumerationResource(EnumerationRepository enumerationRepository) {
        this.enumerationRepository = enumerationRepository;
    }

    /**
     * POST  /enumerations : Create a new enumeration.
     *
     * @param enumeration the enumeration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new enumeration, or with status 400 (Bad Request) if the enumeration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/enumerations")
    @Timed
    public ResponseEntity<Enumeration> createEnumeration(@RequestBody Enumeration enumeration) throws URISyntaxException {
        log.debug("REST request to save Enumeration : {}", enumeration);
        if (enumeration.getId() != null) {
            throw new BadRequestAlertException("A new enumeration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enumeration result = enumerationRepository.save(enumeration);
        return ResponseEntity.created(new URI("/api/enumerations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /enumerations : Updates an existing enumeration.
     *
     * @param enumeration the enumeration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated enumeration,
     * or with status 400 (Bad Request) if the enumeration is not valid,
     * or with status 500 (Internal Server Error) if the enumeration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/enumerations")
    @Timed
    public ResponseEntity<Enumeration> updateEnumeration(@RequestBody Enumeration enumeration) throws URISyntaxException {
        log.debug("REST request to update Enumeration : {}", enumeration);
        if (enumeration.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Enumeration result = enumerationRepository.save(enumeration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, enumeration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /enumerations : get all the enumerations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of enumerations in body
     */
    @GetMapping("/enumerations")
    @Timed
    public ResponseEntity<List<Enumeration>> getAllEnumerations(Pageable pageable) {
        log.debug("REST request to get a page of Enumerations");
        Page<Enumeration> page = enumerationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enumerations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/enumerations/type/{type}")
    @Timed
    public ResponseEntity<List<Enumeration>> getEnumerationsByType(Pageable pageable, @PathVariable String type) {
        log.debug("REST request to get a page of Enumerations By Type");
        Page<Enumeration> page = enumerationRepository.findByType(pageable, EnumerationType.valueOf(type));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enumerations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /enumerations/:id : get the "id" enumeration.
     *
     * @param id the id of the enumeration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the enumeration, or with status 404 (Not Found)
     */
    @GetMapping("/enumerations/{id}")
    @Timed
    public ResponseEntity<Enumeration> getEnumeration(@PathVariable Long id) {
        log.debug("REST request to get Enumeration : {}", id);
        Optional<Enumeration> enumeration = enumerationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enumeration);
    }

    /**
     * DELETE  /enumerations/:id : delete the "id" enumeration.
     *
     * @param id the id of the enumeration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/enumerations/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnumeration(@PathVariable Long id) {
        log.debug("REST request to delete Enumeration : {}", id);

        enumerationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
