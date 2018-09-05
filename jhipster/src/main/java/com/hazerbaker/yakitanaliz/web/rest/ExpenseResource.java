package com.hazerbaker.yakitanaliz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hazerbaker.yakitanaliz.domain.Expense;
import com.hazerbaker.yakitanaliz.repository.ExpenseRepository;
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
 * REST controller for managing Expense.
 */
@RestController
@RequestMapping("/api")
public class ExpenseResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseResource.class);

    private static final String ENTITY_NAME = "expense";

    private final ExpenseRepository expenseRepository;

    public ExpenseResource(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    /**
     * POST  /expenses : Create a new expense.
     *
     * @param expense the expense to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expense, or with status 400 (Bad Request) if the expense has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to save Expense : {}", expense);
        if (expense.getId() != null) {
            throw new BadRequestAlertException("A new expense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expenses : Updates an existing expense.
     *
     * @param expense the expense to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expense,
     * or with status 400 (Bad Request) if the expense is not valid,
     * or with status 500 (Internal Server Error) if the expense couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expenses")
    @Timed
    public ResponseEntity<Expense> updateExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to update Expense : {}", expense);
        if (expense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Expense result = expenseRepository.save(expense);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expense.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expenses : get all the expenses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of expenses in body
     */
    @GetMapping("/expenses")
    @Timed
    public ResponseEntity<List<Expense>> getAllExpenses(Pageable pageable) {
        log.debug("REST request to get a page of Expenses");
        Page<Expense> page = expenseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/expenses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /expenses/:id : get the "id" expense.
     *
     * @param id the id of the expense to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expense, or with status 404 (Not Found)
     */
    @GetMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Expense> getExpense(@PathVariable Long id) {
        log.debug("REST request to get Expense : {}", id);
        Optional<Expense> expense = expenseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expense);
    }

    /**
     * DELETE  /expenses/:id : delete the "id" expense.
     *
     * @param id the id of the expense to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        log.debug("REST request to delete Expense : {}", id);

        expenseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
