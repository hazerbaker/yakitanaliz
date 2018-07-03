package com.hazerbaker.yakitanaliz.service.mapper;

import com.hazerbaker.yakitanaliz.domain.*;
import com.hazerbaker.yakitanaliz.service.dto.EnumerationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Enumeration and its DTO EnumerationDTO.
 */
@Mapper(componentModel = "spring", uses = {EnumerationTypeMapper.class})
public interface EnumerationMapper extends EntityMapper<EnumerationDTO, Enumeration> {

    @Mapping(source = "enumerationType.id", target = "enumerationTypeId")
    @Mapping(source = "parent.id", target = "parentId")
    EnumerationDTO toDto(Enumeration enumeration);

    @Mapping(source = "enumerationTypeId", target = "enumerationType")
    @Mapping(source = "parentId", target = "parent")
    Enumeration toEntity(EnumerationDTO enumerationDTO);

    default Enumeration fromId(Long id) {
        if (id == null) {
            return null;
        }
        Enumeration enumeration = new Enumeration();
        enumeration.setId(id);
        return enumeration;
    }
}
