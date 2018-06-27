package com.hazerbaker.yakitanaliz.util;

import com.hazerbaker.yakitanaliz.model.EnumType;
import com.hazerbaker.yakitanaliz.model.Enum;
import com.hazerbaker.yakitanaliz.model.Vehicle;
import com.hazerbaker.yakitanaliz.repo.EnumRepo;
import com.hazerbaker.yakitanaliz.repo.EnumTypeRepo;
import com.hazerbaker.yakitanaliz.repo.VehicleRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SystemInitialize {

	@Autowired EnumTypeRepo enumTypeRepo;
	@Autowired EnumRepo enumRepo;
	@Autowired VehicleRepo vehicleRepo;

	public void createInitialData() {

		System.out.println("");
		System.out.println("------------ DATA INITIALIZATION START ------------");
		System.out.println("");

		EnumType enumType1 = new EnumType();
		enumType1.setName("Make");
		enumTypeRepo.save(enumType1);
		EnumType enumType2 = new EnumType();
		enumType2.setName("Model");
		enumTypeRepo.save(enumType2);
		EnumType enumType3 = new EnumType();
		enumType3.setName("FuelType");
		enumTypeRepo.save(enumType3);

		Enum makeEnum1 = new Enum();
		makeEnum1.setEnumType(enumType1);
		makeEnum1.setName("Renault");
		enumRepo.save(makeEnum1);
		Enum modelEnum1 = new Enum();
		modelEnum1.setEnumType(enumType2);
		modelEnum1.setName("Clio");
		modelEnum1.setParent(makeEnum1);
		enumRepo.save(modelEnum1);
		Enum modelEnum2 = new Enum();
		modelEnum2.setEnumType(enumType2);
		modelEnum2.setName("Fluence");
		modelEnum2.setParent(makeEnum1);
		enumRepo.save(modelEnum2);

		Enum makeEnum2 = new Enum();
		makeEnum2.setEnumType(enumType1);
		makeEnum2.setName("Fiat");
		enumRepo.save(makeEnum2);
		Enum modelEnum3 = new Enum();
		modelEnum3.setEnumType(enumType2);
		modelEnum3.setName("Punto");
		modelEnum3.setParent(makeEnum2);
		enumRepo.save(modelEnum3);
		Enum modelEnum4 = new Enum();
		modelEnum4.setEnumType(enumType2);
		modelEnum4.setName("Egea");
		modelEnum4.setParent(makeEnum2);
		enumRepo.save(modelEnum4);

		Enum makeEnum3 = new Enum();
		makeEnum3.setEnumType(enumType1);
		makeEnum3.setName("Mazda");
		enumRepo.save(makeEnum3);
		Enum modelEnum5 = new Enum();
		modelEnum5.setEnumType(enumType2);
		modelEnum5.setName("3");
		modelEnum5.setParent(makeEnum3);
		enumRepo.save(modelEnum5);
		Enum modelEnum6 = new Enum();
		modelEnum6.setEnumType(enumType2);
		modelEnum6.setName("5");
		modelEnum6.setParent(makeEnum3);
		enumRepo.save(modelEnum6);

		Enum fuelTypeEnum1 = new Enum();
		fuelTypeEnum1.setEnumType(enumType3);
		fuelTypeEnum1.setName("Benzinli");
		enumRepo.save(fuelTypeEnum1);
		Enum fuelTypeEnum2 = new Enum();
		fuelTypeEnum2.setEnumType(enumType3);
		fuelTypeEnum2.setName("Hibrid");
		enumRepo.save(fuelTypeEnum2);
		Enum fuelTypeEnum3 = new Enum();
		fuelTypeEnum3.setEnumType(enumType3);
		fuelTypeEnum3.setName("Dizel");
		enumRepo.save(fuelTypeEnum3);
		Enum fuelTypeEnum4 = new Enum();
		fuelTypeEnum4.setEnumType(enumType3);
		fuelTypeEnum4.setName("Elektrikli");
		enumRepo.save(fuelTypeEnum4);

		Vehicle vehicle = new Vehicle();
		vehicle.setMake(modelEnum1.getParent());
		vehicle.setModel(modelEnum1);
		vehicleRepo.save(vehicle);
		
		System.out.println("");
		System.out.println("------------ DATA INITIALIZATION END ------------");
		System.out.println("");
	}
}