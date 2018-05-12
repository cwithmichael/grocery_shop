package com.cwithmichael.groceries.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Product {

	@Id
	public ObjectId id;

	public String pid;
	@TextIndexed
	public String description;
	public LocalDate lastSold;
	public String shelfLife;
	public String department;
	public BigDecimal price;
	public String unit;
	public Integer xFor;
	public BigDecimal cost;

	public Product() {
	}

	public Product(String pid, String description, LocalDate lastSold, String shelfLife, String department,
			BigDecimal price, String unit, Integer xFor, BigDecimal cost) {
		this.pid = pid;
		this.description = description;
		this.lastSold = lastSold;
		this.shelfLife = shelfLife;
		this.department = department;
		this.price = price;
		this.unit = unit;
		this.xFor = xFor;
		this.cost = cost;

	}

	@Override
	public String toString() {
		return String.format(
				"Product[id=%s, description='%s', lastSold='%s', shelfLife='%s', department='%s',"
						+ "price=%s, unit=%s, xFor=%d, cost=%s]",
				pid, description, lastSold, shelfLife, department, price, unit, xFor, cost);
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getLastSold() {
		return lastSold;
	}

	public void setLastSold(LocalDate lastSold) {
		this.lastSold = lastSold;
	}

	public String getShelfLife() {
		return shelfLife;
	}

	public void setShelfLife(String shelfLife) {
		this.shelfLife = shelfLife;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Integer getxFor() {
		return xFor;
	}

	public void setxFor(Integer xFor) {
		this.xFor = xFor;
	}

	public BigDecimal getCost() {
		return cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}

	public ObjectId getId() {
		return id;
	}
}
