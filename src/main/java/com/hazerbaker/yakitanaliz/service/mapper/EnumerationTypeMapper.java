package com.hazerbaker.yakitanaliz.service.mapper;

import com.hazerbaker.yakitanaliz.domain.*;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EnumerationType and its DTO EnumerationTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EnumerationTypeMapper extends EntityMapper<EnumerationTypeDTO, EnumerationType> {



    default EnumerationType fromId(Long id) {
        if (id == null) {
            return null;
        }
        EnumerationType enumerationType = new EnumerationType();
        enumerationType.setId(id);
        return enumerationType;
    }
}
