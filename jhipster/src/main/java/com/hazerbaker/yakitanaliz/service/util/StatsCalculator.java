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
        List<FillUp> fillUps = fillUpRepository.findByVehicleIdOrderByTotalDistanceDesc(vehicle.getId());
        FillUp prevFillUp = null;
        FillUp partialFillUp = null;
        for(FillUp fillUp: fillUps) {
            if(prevFillUp != null) {
                if(!fillUp.isMissed() && !fillUp.isPartial()) {
                    fillUp.setStatsDistance(fillUp.getTotalDistance() - prevFillUp.getTotalDistance());
                    fillUp.setStatsQuantity(fillUp.getQuantity() + (partialFillUp != null ? partialFillUp.getQuantity() : 0));
                }
            }
            if(!fillUp.isPartial()) {
                prevFillUp = fillUp;
            }
            else {
                if(partialFillUp == null) partialFillUp = fillUp;
                else {
                    partialFillUp.setQuantity(partialFillUp.getQuantity() + fillUp.getQuantity());
                }
            }
        }
    }
}