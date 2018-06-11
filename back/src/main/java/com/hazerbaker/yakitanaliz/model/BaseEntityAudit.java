package com.hazerbaker.yakitanaliz.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class BaseEntityAudit extends BaseEntity {

    @Column(name = "createdAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "createdBy", nullable = true, insertable = true, updatable = false, length = 16)
    private UUID createdBy;

    @Column(name = "updatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "updatedBy", nullable = true, insertable = true, updatable = true, length = 16)
    private UUID updatedBy;

    public Date getCreatedAt() {
        return createdAt;
    }

    public UUID getCreatedBy() {
        return createdBy;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public UUID getUpdatedBy() {
        return updatedBy;
    }

    @PrePersist
    public void setCreationInfo() {
        this.createdAt = new Date();
    }

    @PreUpdate
    public void setChangeInfo() {
        this.updatedAt = new Date();
    }

}
