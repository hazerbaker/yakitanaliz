package com.hazerbaker.otodepom.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.otodepom.domain.Enumeration;
import com.hazerbaker.otodepom.domain.enumeration.EnumerationType;
import com.hazerbaker.otodepom.repository.EnumerationRepository;
import com.hazerbaker.otodepom.web.rest.errors.BadRequestAlertException;
import com.hazerbaker.otodepom.web.rest.util.HeaderUtil;
import com.hazerbaker.otodepom.web.rest.util.PaginationUtil;
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

@RestController
@RequestMapping("/api")
public class EnumerationResource {

    private final Logger log = LoggerFactory.getLogger(EnumerationResource.class);

    private static final String ENTITY_NAME = "enumeration";

    private final EnumerationRepository enumerationRepository;

    public EnumerationResource(EnumerationRepository enumerationRepository) {
        this.enumerationRepository = enumerationRepository;
    }

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

    @GetMapping("/enumerations")
    @Timed
    public ResponseEntity<List<Enumeration>> getAllEnumerations(Pageable pageable) {
        log.debug("REST request to get a page of Enumerations");
        Page<Enumeration> page = enumerationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/enumerations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/enumerations/bytype/{type}")
    @Timed
    public ResponseEntity<List<Enumeration>> getEnumerationsByType(@PathVariable String type) {
        log.debug("REST request to get a page of Enumerations By Type");
        List<Enumeration> list = enumerationRepository.findByTypeOrderByNameAsc(EnumerationType.valueOf(type));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/enumerations/byparent/{parent}")
    @Timed
    public ResponseEntity<List<Enumeration>> getEnumerationsByParent(@PathVariable Enumeration parent) {
        log.debug("REST request to get a page of Enumerations By Type");
        List<Enumeration> list = enumerationRepository.findByParentOrderByNameAsc(parent);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/enumerations/{id}")
    @Timed
    public ResponseEntity<Enumeration> getEnumeration(@PathVariable Long id) {
        log.debug("REST request to get Enumeration : {}", id);
        Optional<Enumeration> enumeration = enumerationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enumeration);
    }

    @DeleteMapping("/enumerations/{id}")
    @Timed
    public ResponseEntity<Void> deleteEnumeration(@PathVariable Long id) {
        log.debug("REST request to delete Enumeration : {}", id);

        enumerationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
