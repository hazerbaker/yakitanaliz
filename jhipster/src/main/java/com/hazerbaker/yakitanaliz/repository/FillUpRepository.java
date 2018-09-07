package com.hazerbaker.yakitanaliz.repository;

import java.util.List;

import com.hazerbaker.yakitanaliz.domain.FillUp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FillUp entity.
 */
@Repository
public interface FillUpRepository extends JpaRepository<FillUp, Long> {

    Page<FillUp> findByVehicleIdOrderByOdometerDesc(Pageable pageable, Long id);

    List<FillUp> findByVehicleIdOrderByOdometerAsc(Long id);

    List<FillUp> findByVehicleId(Long id);
}
