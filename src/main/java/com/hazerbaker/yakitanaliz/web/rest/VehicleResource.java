package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.domain.Vehicle;
import com.hazerbaker.yakitanaliz.repository.VehicleRepository;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;
import com.hazerbaker.yakitanaliz.repository.UserRepository;
import com.hazerbaker.yakitanaliz.security.SecurityUtils;
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
 * REST controller for managing Vehicle.
 */
@RestController
@RequestMapping("/api")
public class VehicleResource {

    private final Logger log = LoggerFactory.getLogger(VehicleResource.class);

    private static final String ENTITY_NAME = "vehicle";

    private final VehicleRepository vehicleRepository;

    private final UserRepository userRepository;

    private final FillUpRepository fillUpRepository;

    public VehicleResource(VehicleRepository vehicleRepository, UserRepository userRepository,
            FillUpRepository fillUpRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
        this.fillUpRepository = fillUpRepository;
    }

    /**
     * POST /vehicles : Create a new vehicle.
     *
     * @param vehicle the vehicle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         vehicle, or with status 400 (Bad Request) if the vehicle has already
     *         an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicles")
    @Timed
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) throws URISyntaxException {
        log.debug("REST request to save Vehicle : {}", vehicle);
        if (vehicle.getId() != null) {
            throw new BadRequestAlertException("A new vehicle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        vehicle.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
        Vehicle result = vehicleRepository.save(vehicle);
        return ResponseEntity.created(new URI("/api/vehicles/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /vehicles : Updates an existing vehicle.
     *
     * @param vehicle the vehicle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         vehicle, or with status 400 (Bad Request) if the vehicle is not
     *         valid, or with status 500 (Internal Server Error) if the vehicle
     *         couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicles")
    @Timed
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) throws URISyntaxException {
        log.debug("REST request to update Vehicle : {}", vehicle);
        if (vehicle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vehicle result = vehicleRepository.save(vehicle);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicle.getId().toString()))
                .body(result);
    }

    /**
     * GET /vehicles : get all the vehicles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicles in
     *         body
     */
    @GetMapping("/vehicles")
    @Timed
    public ResponseEntity<List<Vehicle>> getAllVehicles(Pageable pageable) {
        log.debug("REST request to get a page of Vehicles");
        Page<Vehicle> page = vehicleRepository.findByUserIsCurrentUser(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /vehicles/:id : get the "id" vehicle.
     *
     * @param id the id of the vehicle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicle, or
     *         with status 404 (Not Found)
     */
    @GetMapping("/vehicles/{id}")
    @Timed
    public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
        log.debug("REST request to get Vehicle : {}", id);
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicle);
    }

    /**
     * DELETE /vehicles/:id : delete the "id" vehicle.
     *
     * @param id the id of the vehicle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicles/{id}")
    @Timed
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        log.debug("REST request to delete Vehicle : {}", id);

        List<FillUp> fillUps = fillUpRepository.findByVehicleId(id);
        for(FillUp fillUp : fillUps) {
            fillUpRepository.delete(fillUp);
        }
        
        vehicleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
