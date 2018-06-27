package com.hazerbaker.yakitanaliz.service;

import java.util.List;
import java.util.UUID;

import com.hazerbaker.yakitanaliz.model.Enum;
import com.hazerbaker.yakitanaliz.repo.EnumRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnumServiceImpl implements BaseEntityService<Enum> {

	@Autowired EnumRepo enumRepo;

	@Override
	public Enum findById(UUID id) {
		return enumRepo.findOne(id);
	}

	@Override
	public List<Enum> findAll() {
		return enumRepo.findAll();
	}

}