package com.hazerbaker.yakitanaliz.service.mapper;

import com.hazerbaker.yakitanaliz.domain.*;
import com.hazerbaker.yakitanaliz.service.dto.VehicleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vehicle and its DTO VehicleDTO.
 */
@Mapper(componentModel = "spring", uses = {EnumerationMapper.class})
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {

    @Mapping(source = "make.id", target = "makeId")
    @Mapping(source = "model.id", target = "modelId")
    VehicleDTO toDto(Vehicle vehicle);

    @Mapping(source = "makeId", target = "make")
    @Mapping(source = "modelId", target = "model")
    Vehicle toEntity(VehicleDTO vehicleDTO);

    default Vehicle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vehicle vehicle = new Vehicle();
        vehicle.setId(id);
        return vehicle;
    }
}
