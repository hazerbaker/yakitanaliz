package com.hazerbaker.yakitanaliz.service;

import java.util.List;
import java.util.UUID;

import com.hazerbaker.yakitanaliz.model.Vehicle;
import com.hazerbaker.yakitanaliz.repo.VehicleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleServiceImpl implements BaseEntityService<Vehicle> {

	@Autowired VehicleRepo vehicleRepo;

	@Override
	public Vehicle findById(UUID id) {
		return vehicleRepo.findOne(id);
	}

	@Override
	public List<Vehicle> findAll() {
		return vehicleRepo.findAll();
	}

	// @Autowired
	// private VehicleRepo vehicleRepo;

	// @Override
	// @PreAuthorize("hasAuthority('ROLE_WRITE')")
	// public Vehicle save(Vehicle vehicle) throws BusinessException {
	// 	validateSave(vehicle);
	// 	return vehicleRepo.save(vehicle);
	// }

}