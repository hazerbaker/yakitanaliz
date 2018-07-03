package com.hazerbaker.yakitanaliz.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Enumeration entity.
 */
public class EnumerationDTO implements Serializable {

    private Long id;

    private String name;

    private String description;

    private Long enumerationTypeId;

    private Long parentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getEnumerationTypeId() {
        return enumerationTypeId;
    }

    public void setEnumerationTypeId(Long enumerationTypeId) {
        this.enumerationTypeId = enumerationTypeId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long enumerationId) {
        this.parentId = enumerationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EnumerationDTO enumerationDTO = (EnumerationDTO) o;
        if (enumerationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enumerationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnumerationDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", enumerationType=" + getEnumerationTypeId() +
            ", parent=" + getParentId() +
            "}";
    }
}
