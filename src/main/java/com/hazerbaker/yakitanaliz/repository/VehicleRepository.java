package com.hazerbaker.yakitanaliz.repository;

import com.hazerbaker.yakitanaliz.domain.Vehicle;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Vehicle entity.
 */
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("select vehicle from Vehicle vehicle where vehicle.user.login = ?#{principal.username}")
    Page<Vehicle> findByUserIsCurrentUser(Pageable pageable);

}
