package com.hazerbaker.otodepom.web.rest;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.otodepom.domain.FillUp;
import com.hazerbaker.otodepom.domain.Vehicle;
import com.hazerbaker.otodepom.repository.ExpenseRepository;
import com.hazerbaker.otodepom.repository.FillUpRepository;
import com.hazerbaker.otodepom.repository.UserRepository;
import com.hazerbaker.otodepom.repository.VehicleRepository;
import com.hazerbaker.otodepom.security.SecurityUtils;
import com.hazerbaker.otodepom.service.util.ImageUtil;
import com.hazerbaker.otodepom.service.util.StatsCalculator;
import com.hazerbaker.otodepom.web.rest.errors.BadRequestAlertException;
import com.hazerbaker.otodepom.web.rest.util.HeaderUtil;
import com.hazerbaker.otodepom.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.github.jhipster.web.util.ResponseUtil;

@RestController
@RequestMapping("/api")
public class VehicleResource {

    private final Logger log = LoggerFactory.getLogger(VehicleResource.class);

    private static final String ENTITY_NAME = "vehicle";

    private final VehicleRepository vehicleRepository;

    private final UserRepository userRepository;

    private final FillUpRepository fillUpRepository;

    private final ExpenseRepository expenseRepository;

    public VehicleResource(VehicleRepository vehicleRepository, UserRepository userRepository,
            FillUpRepository fillUpRepository, ExpenseRepository expenseRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
        this.fillUpRepository = fillUpRepository;
        this.expenseRepository = expenseRepository;
    }

    @PostMapping("/vehicles")
    @Timed
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) throws URISyntaxException, IOException {
        log.debug("REST request to save Vehicle : {}", vehicle);
        if (vehicle.getId() != null) {
            throw new BadRequestAlertException("A new vehicle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if(vehicle.getPhotoContentType() != "") vehicle.setPhoto(ImageUtil.resize(vehicle.getPhoto(), 400));
        vehicle.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
        Vehicle result = vehicleRepository.save(vehicle);
        return ResponseEntity.created(new URI("/api/vehicles/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    @PutMapping("/vehicles")
    @Timed
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) throws URISyntaxException, IOException {
        log.debug("REST request to update Vehicle : {}", vehicle);
        if (vehicle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if(vehicle.getPhotoContentType() != "") vehicle.setPhoto(ImageUtil.resize(vehicle.getPhoto(), 400));
        vehicle.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
        Vehicle result = vehicleRepository.save(vehicle);
        StatsCalculator.calculateVehicle(vehicle, fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicle.getId().toString()))
                .body(result);
    }

    @GetMapping("/vehicles")
    @Timed
    public ResponseEntity<List<Vehicle>> getAllVehicles(Pageable pageable) {
        log.debug("REST request to get a page of Vehicles");
        Page<Vehicle> page = vehicleRepository.findByUserIsCurrentUser(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/vehicles/{id}")
    @Timed
    public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {
        log.debug("REST request to get Vehicle : {}", id);
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vehicle);
    }

    @DeleteMapping("/vehicles/{id}")
    @Timed
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        log.debug("REST request to delete Vehicle : {}", id);

        List<FillUp> fillUps = fillUpRepository.findByVehicleId(id);
        for (FillUp fillUp : fillUps) {
            fillUpRepository.delete(fillUp);
        }

        vehicleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
