package com.hazerbaker.yakitanaliz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.hazerbaker.yakitanaliz.domain.enumeration.ExpenseType;

/**
 * A Expense.
 */
@Entity
@Table(name = "expense")
public class Expense implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ExpenseType type;

    @Column(name = "odometer")
    private Integer odometer;

    @Column(name = "paid_amount")
    private Double paidAmount;

    @Column(name = "note")
    private String note;

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

    public LocalDate getDate() {
        return date;
    }

    public Expense date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ExpenseType getType() {
        return type;
    }

    public Expense type(ExpenseType type) {
        this.type = type;
        return this;
    }

    public void setType(ExpenseType type) {
        this.type = type;
    }

    public Integer getOdometer() {
        return odometer;
    }

    public Expense odometer(Integer odometer) {
        this.odometer = odometer;
        return this;
    }

    public void setOdometer(Integer odometer) {
        this.odometer = odometer;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public Expense paidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
        return this;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public String getNote() {
        return note;
    }

    public Expense note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public Expense vehicle(Vehicle vehicle) {
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
        Expense expense = (Expense) o;
        if (expense.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), expense.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Expense{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", type='" + getType() + "'" +
            ", odometer=" + getOdometer() +
            ", paidAmount=" + getPaidAmount() +
            ", note='" + getNote() + "'" +
            "}";
    }
}
