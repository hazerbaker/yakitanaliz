package com.hazerbaker.otodepom.repository;

import com.hazerbaker.otodepom.domain.Vehicle;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vehicle entity.
 */
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("select vehicle from Vehicle vehicle where vehicle.user.login = ?#{principal.username}")
    Page<Vehicle> findByUserIsCurrentUser(Pageable pageable);

}
