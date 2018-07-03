package com.hazerbaker.yakitanaliz.service.mapper;

import com.hazerbaker.yakitanaliz.domain.*;
import com.hazerbaker.yakitanaliz.service.dto.FillUpDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FillUp and its DTO FillUpDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleMapper.class})
public interface FillUpMapper extends EntityMapper<FillUpDTO, FillUp> {

    @Mapping(source = "vehicle.id", target = "vehicleId")
    FillUpDTO toDto(FillUp fillUp);

    @Mapping(source = "vehicleId", target = "vehicle")
    FillUp toEntity(FillUpDTO fillUpDTO);

    default FillUp fromId(Long id) {
        if (id == null) {
            return null;
        }
        FillUp fillUp = new FillUp();
        fillUp.setId(id);
        return fillUp;
    }
}
