package com.hazerbaker.yakitanaliz.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hazerbaker.yakitanaliz.model.Vehicle;
import com.hazerbaker.yakitanaliz.service.VehicleServiceImpl;


@RestController
@RequestMapping( value = "/vehicle", produces = MediaType.APPLICATION_JSON_VALUE )
public class VehicleController extends BaseEntityRestController<Vehicle> {

    public VehicleController(VehicleServiceImpl service) {
		super(service, Vehicle.class);
	}

	

}