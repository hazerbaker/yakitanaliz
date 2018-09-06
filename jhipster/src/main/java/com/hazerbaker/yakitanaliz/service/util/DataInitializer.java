package com.hazerbaker.yakitanaliz.service.util;

import com.hazerbaker.yakitanaliz.domain.Enumeration;
import com.hazerbaker.yakitanaliz.domain.enumeration.EnumerationType;
import com.hazerbaker.yakitanaliz.repository.EnumerationRepository;

/**
 * Utility class for generating random Strings.
 */
public class DataInitializer {
    
    private final EnumerationRepository enumerationRepository;

    public DataInitializer(EnumerationRepository enumerationRepository) {
        this.enumerationRepository = enumerationRepository;
    }

    public void run() {
        
        System.out.println("------------------------------- Initializing data start -------------------------");
        
        //enumerationRepository.deleteAll();

        brandMaker("Hyundai", new String[] {"Accent", "Getz", "Sonata"});
        brandMaker("Opel", new String[] {"Astra", "Corsa", "Vectra"});
        
        System.out.println("------------------------------- Initializing data end ---------------------------");
    }

    public void brandMaker(String make, String[] models) {
        if(enumerationRepository.findByName(make) == null) {
            Enumeration enum1 = new Enumeration();
            enum1.setName(make);
            enum1.setType(EnumerationType.VEHICLEMAKE);
            enumerationRepository.save(enum1);
            System.out.println("=====>>>> " + enum1.getName() + " created with id: " + enum1.getId());
            for(String model: models) {
                Enumeration enum2 = new Enumeration();
                enum2.setName(model);
                enum2.setParent(enum1);
                enum2.setType(EnumerationType.VEHICLEMODEL);
                enumerationRepository.save(enum2);
                System.out.println("==========>>>> " + enum2.getName() + " created with id: " + enum2.getId());
            }
        }
    }
}