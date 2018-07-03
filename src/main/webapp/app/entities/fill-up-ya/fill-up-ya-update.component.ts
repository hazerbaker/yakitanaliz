import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFillUpYa } from 'app/shared/model/fill-up-ya.model';
import { FillUpYaService } from './fill-up-ya.service';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from 'app/entities/vehicle-ya';

@Component({
    selector: 'jhi-fill-up-ya-update',
    templateUrl: './fill-up-ya-update.component.html'
})
export class FillUpYaUpdateComponent implements OnInit {
    private _fillUp: IFillUpYa;
    isSaving: boolean;

    vehicles: IVehicleYa[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private fillUpService: FillUpYaService,
        private vehicleService: VehicleYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fillUp }) => {
            this.fillUp = fillUp;
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
        if (this.fillUp.id !== undefined) {
            this.subscribeToSaveResponse(this.fillUpService.update(this.fillUp));
        } else {
            this.subscribeToSaveResponse(this.fillUpService.create(this.fillUp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFillUpYa>>) {
        result.subscribe((res: HttpResponse<IFillUpYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get fillUp() {
        return this._fillUp;
    }

    set fillUp(fillUp: IFillUpYa) {
        this._fillUp = fillUp;
    }
}
