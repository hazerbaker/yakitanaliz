import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from './vehicle-ya.service';
import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';
import { EnumerationYaService } from 'app/entities/enumeration-ya';

@Component({
    selector: 'jhi-vehicle-ya-update',
    templateUrl: './vehicle-ya-update.component.html'
})
export class VehicleYaUpdateComponent implements OnInit {
    private _vehicle: IVehicleYa;
    isSaving: boolean;

    enumerations: IEnumerationYa[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private vehicleService: VehicleYaService,
        private enumerationService: EnumerationYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
        this.enumerationService.query().subscribe(
            (res: HttpResponse<IEnumerationYa[]>) => {
                this.enumerations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleService.update(this.vehicle));
        } else {
            this.subscribeToSaveResponse(this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVehicleYa>>) {
        result.subscribe((res: HttpResponse<IVehicleYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEnumerationById(index: number, item: IEnumerationYa) {
        return item.id;
    }
    get vehicle() {
        return this._vehicle;
    }

    set vehicle(vehicle: IVehicleYa) {
        this._vehicle = vehicle;
    }
}
