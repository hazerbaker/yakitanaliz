package com.hazerbaker.yakitanaliz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.hazerbaker.yakitanaliz.domain.enumeration.EnumerationType;

/**
 * A Enumeration.
 */
@Entity
@Table(name = "enumeration")
public class Enumeration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private EnumerationType type;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Enumeration parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Enumeration name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Enumeration description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EnumerationType getType() {
        return type;
    }

    public Enumeration type(EnumerationType type) {
        this.type = type;
        return this;
    }

    public void setType(EnumerationType type) {
        this.type = type;
    }

    public Enumeration getParent() {
        return parent;
    }

    public Enumeration parent(Enumeration enumeration) {
        this.parent = enumeration;
        return this;
    }

    public void setParent(Enumeration enumeration) {
        this.parent = enumeration;
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
        Enumeration enumeration = (Enumeration) o;
        if (enumeration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enumeration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Enumeration{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
