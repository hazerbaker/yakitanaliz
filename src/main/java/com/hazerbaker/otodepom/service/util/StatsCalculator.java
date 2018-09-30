package com.hazerbaker.otodepom.service.util;

import java.util.List;

import com.hazerbaker.otodepom.domain.Expense;
import com.hazerbaker.otodepom.domain.FillUp;
import com.hazerbaker.otodepom.domain.Vehicle;
import com.hazerbaker.otodepom.repository.ExpenseRepository;
import com.hazerbaker.otodepom.repository.FillUpRepository;
import com.hazerbaker.otodepom.repository.VehicleRepository;

public class StatsCalculator {

    public StatsCalculator() {
        
    }

    public static void calculateVehicle(Vehicle vehicle, FillUpRepository fillUpRepository, ExpenseRepository expenseRepository, VehicleRepository vehicleRepository) {
        Integer totalStatsDistance = 0;
        Double totalStatsQuantity = Double.parseDouble("0");
        Double totalExpense = Double.parseDouble("0");
        Integer odometer = 0;

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
            totalStatsDistance += fillUp.getStatsDistance();
            totalStatsQuantity += fillUp.getStatsQuantity();
            totalExpense += fillUp.getQuantity() * fillUp.getUnitPrice();
            if(fillUp.getOdometer() > odometer) odometer = fillUp.getOdometer();
            fillUpRepository.save(fillUp);
        }

        List<Expense> expenses = expenseRepository.findByVehicleIdOrderByOdometerAsc(vehicle.getId());
        for(Expense expense: expenses) {
            totalExpense += expense.getPaidAmount();
            if(expense.getOdometer() > odometer) odometer = expense.getOdometer();
        }

        vehicle.setStatsDistance(totalStatsDistance);
        vehicle.setStatsQuantity(totalStatsQuantity);
        vehicle.setTotalExpense(totalExpense);
        vehicle.setOdometer(odometer);
        vehicleRepository.save(vehicle);        
    }
}