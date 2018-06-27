package com.hazerbaker.yakitanaliz.repo;

import java.util.UUID;

import com.hazerbaker.yakitanaliz.model.EnumType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EnumTypeRepo extends JpaRepository<EnumType, UUID>, JpaSpecificationExecutor<EnumType> {

	EnumType findByName(String name);
}