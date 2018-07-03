import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';

@Component({
    selector: 'jhi-vehicle-ya-detail',
    templateUrl: './vehicle-ya-detail.component.html'
})
export class VehicleYaDetailComponent implements OnInit {
    vehicle: IVehicleYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
    }

    previousState() {
        window.history.back();
    }
}
