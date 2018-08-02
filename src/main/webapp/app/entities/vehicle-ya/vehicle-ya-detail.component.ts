import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';

@Component({
    selector: 'jhi-vehicle-ya-detail',
    templateUrl: './vehicle-ya-detail.component.html'
})
export class VehicleYaDetailComponent implements OnInit {
    vehicle: IVehicleYa;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
