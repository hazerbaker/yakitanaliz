package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;
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
 * REST controller for managing FillUp.
 */
@RestController
@RequestMapping("/api")
public class FillUpResource {

    private final Logger log = LoggerFactory.getLogger(FillUpResource.class);

    private static final String ENTITY_NAME = "fillUp";

    private final FillUpRepository fillUpRepository;

    public FillUpResource(FillUpRepository fillUpRepository) {
        this.fillUpRepository = fillUpRepository;
    }

    /**
     * POST  /fill-ups : Create a new fillUp.
     *
     * @param fillUp the fillUp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fillUp, or with status 400 (Bad Request) if the fillUp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUp> createFillUp(@RequestBody FillUp fillUp) throws URISyntaxException {
        log.debug("REST request to save FillUp : {}", fillUp);
        if (fillUp.getId() != null) {
            throw new BadRequestAlertException("A new fillUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FillUp result = fillUpRepository.save(fillUp);
        return ResponseEntity.created(new URI("/api/fill-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fill-ups : Updates an existing fillUp.
     *
     * @param fillUp the fillUp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fillUp,
     * or with status 400 (Bad Request) if the fillUp is not valid,
     * or with status 500 (Internal Server Error) if the fillUp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUp> updateFillUp(@RequestBody FillUp fillUp) throws URISyntaxException {
        log.debug("REST request to update FillUp : {}", fillUp);
        if (fillUp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FillUp result = fillUpRepository.save(fillUp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fillUp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fill-ups : get all the fillUps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fillUps in body
     */
    @GetMapping("/fill-ups")
    @Timed
    public ResponseEntity<List<FillUp>> getAllFillUps(Pageable pageable) {
        log.debug("REST request to get a page of FillUps");
        Page<FillUp> page = fillUpRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fill-ups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fill-ups/:id : get the "id" fillUp.
     *
     * @param id the id of the fillUp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fillUp, or with status 404 (Not Found)
     */
    @GetMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<FillUp> getFillUp(@PathVariable Long id) {
        log.debug("REST request to get FillUp : {}", id);
        Optional<FillUp> fillUp = fillUpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fillUp);
    }

    /**
     * DELETE  /fill-ups/:id : delete the "id" fillUp.
     *
     * @param id the id of the fillUp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<Void> deleteFillUp(@PathVariable Long id) {
        log.debug("REST request to delete FillUp : {}", id);

        fillUpRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
