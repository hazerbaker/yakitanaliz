package com.hazerbaker.otodepom.repository;

import java.util.List;

import com.hazerbaker.otodepom.domain.FillUp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


@Repository
public interface FillUpRepository extends JpaRepository<FillUp, Long> {

    Page<FillUp> findByVehicleIdOrderByOdometerDesc(Pageable pageable, Long id);

    List<FillUp> findByVehicleIdOrderByOdometerAsc(Long id);

    List<FillUp> findByVehicleId(Long id);
}
