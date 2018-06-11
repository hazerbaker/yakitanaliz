package com.hazerbaker.yakitanaliz.rest;

import java.util.List;
import java.util.UUID;

import com.hazerbaker.yakitanaliz.service.BaseEntityService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public abstract class BaseEntityRestController<T> {

	protected BaseEntityService<T> service;

	protected Class<T> entityClass;

	public BaseEntityRestController(BaseEntityService<T> service, Class<T> entityClass) {
		this.service = service;
		this.entityClass = entityClass;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/all")
	public List<T> findAll() {
		return service.findAll();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/{id}")
	public T loadById(@PathVariable UUID id) {
		return service.findById(id);
	}
}