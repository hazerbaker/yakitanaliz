package com.hazerbaker.yakitanaliz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Reminder.
 */
@Entity
@Table(name = "reminder")
public class Reminder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "first_date")
    private LocalDate firstDate;

    @Column(name = "recur_date")
    private LocalDate recurDate;

    @Column(name = "first_distance")
    private Integer firstDistance;

    @Column(name = "recur_distance")
    private String recurDistance;

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

    public LocalDate getFirstDate() {
        return firstDate;
    }

    public Reminder firstDate(LocalDate firstDate) {
        this.firstDate = firstDate;
        return this;
    }

    public void setFirstDate(LocalDate firstDate) {
        this.firstDate = firstDate;
    }

    public LocalDate getRecurDate() {
        return recurDate;
    }

    public Reminder recurDate(LocalDate recurDate) {
        this.recurDate = recurDate;
        return this;
    }

    public void setRecurDate(LocalDate recurDate) {
        this.recurDate = recurDate;
    }

    public Integer getFirstDistance() {
        return firstDistance;
    }

    public Reminder firstDistance(Integer firstDistance) {
        this.firstDistance = firstDistance;
        return this;
    }

    public void setFirstDistance(Integer firstDistance) {
        this.firstDistance = firstDistance;
    }

    public String getRecurDistance() {
        return recurDistance;
    }

    public Reminder recurDistance(String recurDistance) {
        this.recurDistance = recurDistance;
        return this;
    }

    public void setRecurDistance(String recurDistance) {
        this.recurDistance = recurDistance;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public Reminder vehicle(Vehicle vehicle) {
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
        Reminder reminder = (Reminder) o;
        if (reminder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reminder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reminder{" +
            "id=" + getId() +
            ", firstDate='" + getFirstDate() + "'" +
            ", recurDate='" + getRecurDate() + "'" +
            ", firstDistance=" + getFirstDistance() +
            ", recurDistance='" + getRecurDistance() + "'" +
            "}";
    }
}
