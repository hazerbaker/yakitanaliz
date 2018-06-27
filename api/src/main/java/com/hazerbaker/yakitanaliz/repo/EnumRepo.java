package com.hazerbaker.yakitanaliz.repo;

import java.util.UUID;

import com.hazerbaker.yakitanaliz.model.Enum;
import com.hazerbaker.yakitanaliz.model.EnumType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EnumRepo extends JpaRepository<Enum, UUID>, JpaSpecificationExecutor<Enum> {

	Enum findByNameAndEnumType(String name, EnumType enumType);
}