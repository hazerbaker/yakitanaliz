package com.hazerbaker.otodepom.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A FillUp.
 */
@Entity
@Table(name = "fill_up")
public class FillUp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "odometer")
    private Integer odometer;

    @Column(name = "partial")
    private Boolean partial;

    @Column(name = "missed")
    private Boolean missed;

    @Column(name = "note")
    private String note;

    @Column(name = "stats_distance")
    private Integer statsDistance;

    @Column(name = "stats_quantity")
    private Double statsQuantity;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Vehicle vehicle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public FillUp quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public FillUp unitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public LocalDate getDate() {
        return date;
    }

    public FillUp date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getOdometer() {
        return odometer;
    }

    public FillUp odometer(Integer odometer) {
        this.odometer = odometer;
        return this;
    }

    public void setOdometer(Integer odometer) {
        this.odometer = odometer;
    }

    public Boolean isPartial() {
        return partial;
    }

    public FillUp partial(Boolean partial) {
        this.partial = partial;
        return this;
    }

    public void setPartial(Boolean partial) {
        this.partial = partial;
    }

    public Boolean isMissed() {
        return missed;
    }

    public FillUp missed(Boolean missed) {
        this.missed = missed;
        return this;
    }

    public void setMissed(Boolean missed) {
        this.missed = missed;
    }

    public String getNote() {
        return note;
    }

    public FillUp note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getStatsDistance() {
        return statsDistance;
    }

    public FillUp statsDistance(Integer statsDistance) {
        this.statsDistance = statsDistance;
        return this;
    }

    public void setStatsDistance(Integer statsDistance) {
        this.statsDistance = statsDistance;
    }

    public Double getStatsQuantity() {
        return statsQuantity;
    }

    public FillUp statsQuantity(Double statsQuantity) {
        this.statsQuantity = statsQuantity;
        return this;
    }

    public void setStatsQuantity(Double statsQuantity) {
        this.statsQuantity = statsQuantity;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public FillUp vehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
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
        FillUp fillUp = (FillUp) o;
        if (fillUp.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fillUp.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FillUp{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            ", date='" + getDate() + "'" +
            ", odometer=" + getOdometer() +
            ", partial='" + isPartial() + "'" +
            ", missed='" + isMissed() + "'" +
            ", note='" + getNote() + "'" +
            ", statsDistance=" + getStatsDistance() +
            ", statsQuantity=" + getStatsQuantity() +
            "}";
    }
}
