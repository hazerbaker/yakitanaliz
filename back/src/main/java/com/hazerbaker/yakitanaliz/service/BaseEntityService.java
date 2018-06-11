package com.hazerbaker.yakitanaliz.service;

import java.util.List;
import java.util.UUID;

public interface BaseEntityService<T> {

	T findById(UUID id);
	
	List<T> findAll();

}