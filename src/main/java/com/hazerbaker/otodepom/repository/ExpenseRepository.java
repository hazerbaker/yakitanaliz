package com.hazerbaker.otodepom.repository;

import java.util.List;

import com.hazerbaker.otodepom.domain.Expense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    Page<Expense> findByVehicleIdOrderByOdometerDesc(Pageable pageable, Long id);

    List<Expense> findByVehicleIdOrderByOdometerAsc(Long id);

    List<Expense> findByVehicleId(Long id);

}
