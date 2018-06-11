package com.hazerbaker.yakitanaliz.repo;

import java.util.UUID;

import com.hazerbaker.yakitanaliz.model.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface VehicleRepo extends JpaRepository<Vehicle, UUID>, JpaSpecificationExecutor<Vehicle> {

	Vehicle findByMake(String make);

}