package com.hazerbaker.yakitanaliz.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

@Entity
@Table(name = "ykt_Vehicle")
@Where(clause = "status=0")
public class Vehicle extends BaseEntityAudit implements Serializable {

    private static final long serialVersionUID = -8097544382325741743L;

	@ManyToOne
	@JoinColumn(name = "make", nullable = false, foreignKey = @ForeignKey(name = "FK_YKT_MAKE_ENUM"))
    private Enum make;
    
    @ManyToOne
	@JoinColumn(name = "model", nullable = false, foreignKey = @ForeignKey(name = "FK_YKT_MODEL_ENUM"))
    private Enum model;

    public Enum getMake() {
        return make;
    }

    public void setMake(Enum make) {
        this.make = make;
    }

    public Enum getModel() {
        return model;
    }

    public void setModel(Enum model) {
        this.model = model;
    }

}