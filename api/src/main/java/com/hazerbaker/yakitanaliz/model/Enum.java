package com.hazerbaker.yakitanaliz.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

@Entity
@Table(name = "ykt_Enum")
@Where(clause = "deleted=0")
public class Enum extends BaseEntity implements Serializable {
	
    private static final long serialVersionUID = 8785396180792482809L;

	@ManyToOne
	@JoinColumn(name = "enumTypeId", nullable = false, foreignKey = @ForeignKey(name = "FK_YKT_ENUM_ENUM_TYPE"))
	private EnumType enumType;
	
	@ManyToOne
	@JoinColumn(name = "enumId", nullable = true, foreignKey = @ForeignKey(name = "FK_YKT_ENUM_ENUM"))
    private Enum parent;

	@Column(name = "name", nullable = false)
    private String name;
	
	@Column(name = "description", nullable = true)
	private String description;
	
	public EnumType getEnumType() {
		return enumType;
	}

	public void setEnumType(EnumType enumType) {
		this.enumType = enumType;
	}

	public Enum getParent() {
		return parent;
	}
	
	public void setParent(Enum parent) {
		this.parent = parent;
	}
	
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