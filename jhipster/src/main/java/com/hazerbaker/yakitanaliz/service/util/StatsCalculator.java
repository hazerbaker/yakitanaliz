package com.hazerbaker.yakitanaliz.service.util;

import java.util.List;

import com.hazerbaker.yakitanaliz.domain.FillUp;
import com.hazerbaker.yakitanaliz.domain.Vehicle;
import com.hazerbaker.yakitanaliz.repository.FillUpRepository;

/**
 * Utility class for generating random Strings.
 */
public class StatsCalculator {

    public StatsCalculator() {
        
    }

    public static void calculateDistances(Vehicle vehicle, FillUpRepository fillUpRepository) {
        List<FillUp> fillUps = fillUpRepository.findByVehicleIdOrderByOdometerAsc(vehicle.getId());
        FillUp prevFillUp = null;
        FillUp partialFillUp = null;
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
            fillUpRepository.save(fillUp);
        }
    }
}