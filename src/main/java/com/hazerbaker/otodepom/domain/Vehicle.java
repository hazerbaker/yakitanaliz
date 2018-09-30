package com.hazerbaker.otodepom.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.hazerbaker.otodepom.domain.enumeration.FuelType;

import com.hazerbaker.otodepom.domain.enumeration.Transmission;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type")
    private FuelType fuelType;

    @Column(name = "cc")
    private Integer cc;

    @Column(name = "jhi_year")
    private Integer year;

    @Enumerated(EnumType.STRING)
    @Column(name = "transmission")
    private Transmission transmission;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "stats_distance")
    private Integer statsDistance;

    @Column(name = "stats_quantity")
    private Double statsQuantity;

    @Column(name = "total_expense")
    private Double totalExpense;

    @Column(name = "odometer")
    private Integer odometer;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Enumeration model;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public Vehicle fuelType(FuelType fuelType) {
        this.fuelType = fuelType;
        return this;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public Integer getCc() {
        return cc;
    }

    public Vehicle cc(Integer cc) {
        this.cc = cc;
        return this;
    }

    public void setCc(Integer cc) {
        this.cc = cc;
    }

    public Integer getYear() {
        return year;
    }

    public Vehicle year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Transmission getTransmission() {
        return transmission;
    }

    public Vehicle transmission(Transmission transmission) {
        this.transmission = transmission;
        return this;
    }

    public void setTransmission(Transmission transmission) {
        this.transmission = transmission;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Vehicle photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Vehicle photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public Integer getStatsDistance() {
        return statsDistance;
    }

    public Vehicle statsDistance(Integer statsDistance) {
        this.statsDistance = statsDistance;
        return this;
    }

    public void setStatsDistance(Integer statsDistance) {
        this.statsDistance = statsDistance;
    }

    public Double getStatsQuantity() {
        return statsQuantity;
    }

    public Vehicle statsQuantity(Double statsQuantity) {
        this.statsQuantity = statsQuantity;
        return this;
    }

    public void setStatsQuantity(Double statsQuantity) {
        this.statsQuantity = statsQuantity;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public Vehicle totalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
        return this;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public Integer getOdometer() {
        return odometer;
    }

    public Vehicle odometer(Integer odometer) {
        this.odometer = odometer;
        return this;
    }

    public void setOdometer(Integer odometer) {
        this.odometer = odometer;
    }

    public String getNote() {
        return note;
    }

    public Vehicle note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Enumeration getModel() {
        return model;
    }

    public Vehicle model(Enumeration enumeration) {
        this.model = enumeration;
        return this;
    }

    public void setModel(Enumeration enumeration) {
        this.model = enumeration;
    }

    public User getUser() {
        return user;
    }

    public Vehicle user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Vehicle vehicle = (Vehicle) o;
        if (vehicle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", fuelType='" + getFuelType() + "'" +
            ", cc=" + getCc() +
            ", year=" + getYear() +
            ", transmission='" + getTransmission() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", statsDistance=" + getStatsDistance() +
            ", statsQuantity=" + getStatsQuantity() +
            ", totalExpense=" + getTotalExpense() +
            ", odometer=" + getOdometer() +
            ", note='" + getNote() + "'" +
            "}";
    }
}
