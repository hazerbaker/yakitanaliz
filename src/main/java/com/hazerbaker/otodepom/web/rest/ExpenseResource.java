package com.hazerbaker.otodepom.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.otodepom.domain.Expense;
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

/**
 * REST controller for managing Expense.
 */
@RestController
@RequestMapping("/api")
public class ExpenseResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseResource.class);

    private static final String ENTITY_NAME = "expense";

    private final FillUpRepository fillUpRepository;

    private final ExpenseRepository expenseRepository;

    private final VehicleRepository vehicleRepository;

    public ExpenseResource(FillUpRepository fillUpRepository, ExpenseRepository expenseRepository, VehicleRepository vehicleRepository) {
        this.fillUpRepository = fillUpRepository;
        this.expenseRepository = expenseRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @PostMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to save Expense : {}", expense);
        if (expense.getId() != null) {
            throw new BadRequestAlertException("A new expense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expense result = expenseRepository.save(expense);
        StatsCalculator.calculateVehicle(expense.getVehicle(), fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.created(new URI("/api/expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> updateExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to update Expense : {}", expense);
        if (expense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expense result = expenseRepository.save(expense);
        StatsCalculator.calculateVehicle(expense.getVehicle(), fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expense.getId().toString()))
            .body(result);
    }

    @GetMapping("/expenses")
    @Timed
    public ResponseEntity<List<Expense>> getAllExpenses(Pageable pageable) {
        log.debug("REST request to get a page of Expenses");
        Page<Expense> page = expenseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/expenses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/expenses/byvehicle/{id}")
    @Timed
    public ResponseEntity<List<Expense>> getAllExpensesByVehicle(Pageable pageable, @PathVariable Long id) {
        log.debug("REST request to get a page of Expenses By Vehicle");
        Page<Expense> page = expenseRepository.findByVehicleIdOrderByOdometerDesc(pageable, id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/expenses/vehicle/"+id);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Expense> getExpense(@PathVariable Long id) {
        log.debug("REST request to get Expense : {}", id);
        Optional<Expense> expense = expenseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expense);
    }

    @DeleteMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        log.debug("REST request to delete Expense : {}", id);
        Vehicle vehicle = expenseRepository.findById(id).get().getVehicle();
        expenseRepository.deleteById(id);
        StatsCalculator.calculateVehicle(vehicle, fillUpRepository, expenseRepository, vehicleRepository);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
