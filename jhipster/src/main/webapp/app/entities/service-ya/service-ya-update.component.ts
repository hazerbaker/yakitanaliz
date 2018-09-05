import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IServiceYa } from 'app/shared/model/service-ya.model';
import { ServiceYaService } from './service-ya.service';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from 'app/entities/vehicle-ya';

@Component({
    selector: 'jhi-service-ya-update',
    templateUrl: './service-ya-update.component.html'
})
export class ServiceYaUpdateComponent implements OnInit {
    private _service: IServiceYa;
    isSaving: boolean;

    vehicles: IVehicleYa[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private serviceService: ServiceYaService,
        private vehicleService: VehicleYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ service }) => {
            this.service = service;
        });
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicleYa[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.service.id !== undefined) {
            this.subscribeToSaveResponse(this.serviceService.update(this.service));
        } else {
            this.subscribeToSaveResponse(this.serviceService.create(this.service));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServiceYa>>) {
        result.subscribe((res: HttpResponse<IServiceYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVehicleById(index: number, item: IVehicleYa) {
        return item.id;
    }
    get service() {
        return this._service;
    }

    set service(service: IServiceYa) {
        this._service = service;
    }
}
