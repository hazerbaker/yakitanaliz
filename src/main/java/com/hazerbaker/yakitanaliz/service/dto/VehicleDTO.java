package com.hazerbaker.yakitanaliz.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.hazerbaker.yakitanaliz.domain.enumeration.FuelType;
import com.hazerbaker.yakitanaliz.domain.enumeration.Transmission;

/**
 * A DTO for the Vehicle entity.
 */
public class VehicleDTO implements Serializable {

    private Long id;

    private FuelType fuelType;

    private Integer cc;

    private Integer year;

    private Transmission transmission;

    private Long makeId;

    private Long modelId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public Integer getCc() {
        return cc;
    }

    public void setCc(Integer cc) {
        this.cc = cc;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Transmission getTransmission() {
        return transmission;
    }

    public void setTransmission(Transmission transmission) {
        this.transmission = transmission;
    }

    public Long getMakeId() {
        return makeId;
    }

    public void setMakeId(Long enumerationId) {
        this.makeId = enumerationId;
    }

    public Long getModelId() {
        return modelId;
    }

    public void setModelId(Long enumerationId) {
        this.modelId = enumerationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VehicleDTO vehicleDTO = (VehicleDTO) o;
        if (vehicleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleDTO{" +
            "id=" + getId() +
            ", fuelType='" + getFuelType() + "'" +
            ", cc=" + getCc() +
            ", year=" + getYear() +
            ", transmission='" + getTransmission() + "'" +
            ", make=" + getMakeId() +
            ", model=" + getModelId() +
            "}";
    }
}
