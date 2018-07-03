package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.service.FillUpService;
import com.hazerbaker.yakitanaliz.web.rest.errors.BadRequestAlertException;
import com.hazerbaker.yakitanaliz.web.rest.util.HeaderUtil;
import com.hazerbaker.yakitanaliz.web.rest.util.PaginationUtil;
import com.hazerbaker.yakitanaliz.service.dto.FillUpDTO;
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

    private final FillUpService fillUpService;

    public FillUpResource(FillUpService fillUpService) {
        this.fillUpService = fillUpService;
    }

    /**
     * POST  /fill-ups : Create a new fillUp.
     *
     * @param fillUpDTO the fillUpDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fillUpDTO, or with status 400 (Bad Request) if the fillUp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUpDTO> createFillUp(@RequestBody FillUpDTO fillUpDTO) throws URISyntaxException {
        log.debug("REST request to save FillUp : {}", fillUpDTO);
        if (fillUpDTO.getId() != null) {
            throw new BadRequestAlertException("A new fillUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FillUpDTO result = fillUpService.save(fillUpDTO);
        return ResponseEntity.created(new URI("/api/fill-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fill-ups : Updates an existing fillUp.
     *
     * @param fillUpDTO the fillUpDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fillUpDTO,
     * or with status 400 (Bad Request) if the fillUpDTO is not valid,
     * or with status 500 (Internal Server Error) if the fillUpDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUpDTO> updateFillUp(@RequestBody FillUpDTO fillUpDTO) throws URISyntaxException {
        log.debug("REST request to update FillUp : {}", fillUpDTO);
        if (fillUpDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FillUpDTO result = fillUpService.save(fillUpDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fillUpDTO.getId().toString()))
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
    public ResponseEntity<List<FillUpDTO>> getAllFillUps(Pageable pageable) {
        log.debug("REST request to get a page of FillUps");
        Page<FillUpDTO> page = fillUpService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fill-ups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fill-ups/:id : get the "id" fillUp.
     *
     * @param id the id of the fillUpDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fillUpDTO, or with status 404 (Not Found)
     */
    @GetMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<FillUpDTO> getFillUp(@PathVariable Long id) {
        log.debug("REST request to get FillUp : {}", id);
        Optional<FillUpDTO> fillUpDTO = fillUpService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fillUpDTO);
    }

    /**
     * DELETE  /fill-ups/:id : delete the "id" fillUp.
     *
     * @param id the id of the fillUpDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<Void> deleteFillUp(@PathVariable Long id) {
        log.debug("REST request to delete FillUp : {}", id);
        fillUpService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
