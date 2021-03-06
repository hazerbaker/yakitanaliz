package com.hazerbaker.otodepom.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.otodepom.domain.FillUp;
import com.hazerbaker.otodepom.domain.Vehicle;
import com.hazerbaker.otodepom.repository.ExpenseRepository;
import com.hazerbaker.otodepom.repository.FillUpRepository;
import com.hazerbaker.otodepom.repository.VehicleRepository;
import com.hazerbaker.otodepom.service.util.StatsCalculator;
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
public class FillUpResource {

    private final Logger log = LoggerFactory.getLogger(FillUpResource.class);

    private static final String ENTITY_NAME = "fillUp";

    private final FillUpRepository fillUpRepository;

    private final ExpenseRepository expenseRepository;

    private final VehicleRepository vehicleRepository;

    public FillUpResource(FillUpRepository fillUpRepository, ExpenseRepository expenseRepository, VehicleRepository vehicleRepository) {
        this.fillUpRepository = fillUpRepository;
        this.expenseRepository = expenseRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @PostMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUp> createFillUp(@RequestBody FillUp fillUp) throws URISyntaxException {
        log.debug("REST request to save FillUp : {}", fillUp);
        if (fillUp.getId() != null) {
            throw new BadRequestAlertException("A new fillUp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FillUp result = fillUpRepository.save(fillUp);
        StatsCalculator.calculateVehicle(fillUp.getVehicle(), fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.created(new URI("/api/fill-ups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/fill-ups")
    @Timed
    public ResponseEntity<FillUp> updateFillUp(@RequestBody FillUp fillUp) throws URISyntaxException {
        log.debug("REST request to update FillUp : {}", fillUp);
        if (fillUp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FillUp result = fillUpRepository.save(fillUp);
        StatsCalculator.calculateVehicle(fillUp.getVehicle(), fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fillUp.getId().toString()))
            .body(result);
    }

    @GetMapping("/fill-ups")
    @Timed
    public ResponseEntity<List<FillUp>> getAllFillUps(Pageable pageable) {
        log.debug("REST request to get a page of FillUps");
        Page<FillUp> page = fillUpRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fill-ups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/fill-ups/byvehicle/{id}")
    @Timed
    public ResponseEntity<List<FillUp>> getAllFillUpsByVehicle(Pageable pageable, @PathVariable Long id) {
        log.debug("REST request to get a page of FillUps By Vehicle");
        Page<FillUp> page = fillUpRepository.findByVehicleIdOrderByOdometerDesc(pageable, id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fill-ups/vehicle/"+id);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<FillUp> getFillUp(@PathVariable Long id) {
        log.debug("REST request to get FillUp : {}", id);
        Optional<FillUp> fillUp = fillUpRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fillUp);
    }

    @DeleteMapping("/fill-ups/{id}")
    @Timed
    public ResponseEntity<Void> deleteFillUp(@PathVariable Long id) {
        log.debug("REST request to delete FillUp : {}", id);
        Vehicle vehicle = fillUpRepository.findById(id).get().getVehicle();
        fillUpRepository.deleteById(id);
        StatsCalculator.calculateVehicle(vehicle, fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
