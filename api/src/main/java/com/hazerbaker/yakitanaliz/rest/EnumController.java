package com.hazerbaker.yakitanaliz.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hazerbaker.yakitanaliz.model.Enum;
import com.hazerbaker.yakitanaliz.service.EnumServiceImpl;


@RestController
@RequestMapping( value = "/enum", produces = MediaType.APPLICATION_JSON_VALUE )
public class EnumController extends BaseEntityRestController<Enum> {

    public EnumController(EnumServiceImpl service) {
		super(service, Enum.class);
	}

}