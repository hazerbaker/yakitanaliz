package com.hazerbaker.yakitanaliz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

@Entity
@Table(name = "ykt_EnumType")
@Where(clause = "status=0")
public class EnumType extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = -6757761682191097336L;

	@Column(name = "name", nullable = false)
    private String name;
	
	@Column(name = "description", nullable = true)
    private String description;
	
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
    
}