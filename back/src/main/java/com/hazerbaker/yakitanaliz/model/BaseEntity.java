package com.hazerbaker.yakitanaliz.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

import org.hibernate.annotations.GenericGenerator;

@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(generator = "uuid_gen")
    @GenericGenerator(name = "uuid_gen", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", nullable = false, length = 16)
    private UUID id;

    @Version
    @Column(name = "version")
    private Long version;

    @Column(name = "status", nullable = false, columnDefinition = "char(1)")
    String status = "0";

    public UUID getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public Long getVersion() {
        return version;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getId() != null ? getId().hashCode() : 0);

        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null) {
            return false;
        }
        if (getClass() != object.getClass()) {
            return false;
        }

        BaseEntity other = (BaseEntity) object;
        if (getId() != other.getId() && (getId() == null || !getId().equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return getClass().getName() + " [ID=" + id + "]";
    }

}
