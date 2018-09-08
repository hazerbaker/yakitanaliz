package com.hazerbaker.yakitanaliz.service.util;

import java.util.List;

import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.domain.Vehicle;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;
import com.hazerbaker.yakitanaliz.repository.VehicleRepository;

/**
 * Utility class for generating random Strings.
 */
public class StatsCalculator {

    public StatsCalculator() {
        
    }

    public static void calculateDistances(Vehicle vehicle, FillUpRepository fillUpRepository, VehicleRepository vehicleRepository) {
        List<FillUp> fillUps = fillUpRepository.findByVehicleIdOrderByOdometerAsc(vehicle.getId());
        FillUp prevFillUp = null;
        FillUp partialFillUp = null;
        Integer totalStatsDistance = 0;
        Double totalStatsQuantity = Double.parseDouble("0");
        Double totalExpense = Double.parseDouble("0");
        for(FillUp fillUp: fillUps) {
            fillUp.setStatsDistance(0);
            fillUp.setStatsQuantity(Double.parseDouble("0"));
            if(fillUp.isMissed()) {
                prevFillUp = null;
                partialFillUp = null;
            }
            if(prevFillUp != null) {
                if(!fillUp.isMissed() && !fillUp.isPartial()) {
                    fillUp.setStatsDistance(fillUp.getOdometer() - prevFillUp.getOdometer());
                    fillUp.setStatsQuantity(fillUp.getQuantity() + (partialFillUp != null ? partialFillUp.getQuantity() : 0));
                }
            }
            if(!fillUp.isPartial()) {
                prevFillUp = fillUp;
                partialFillUp = null;
            }
            else {
                if(partialFillUp == null) partialFillUp = fillUp;
                else {
                    partialFillUp.setQuantity(partialFillUp.getQuantity() + fillUp.getQuantity());
                }
            }
            totalStatsDistance += fillUp.getStatsDistance();
            totalStatsQuantity += fillUp.getStatsQuantity();
            totalExpense += fillUp.getQuantity() * fillUp.getUnitPrice();
            fillUpRepository.save(fillUp);
        }
        vehicle.setStatsDistance(totalStatsDistance);
        vehicle.setStatsQuantity(totalStatsQuantity);
        vehicle.setTotalExpense(totalExpense);
        vehicleRepository.save(vehicle);
    }
}