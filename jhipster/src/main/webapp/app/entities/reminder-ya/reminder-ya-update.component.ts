import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReminderYa } from 'app/shared/model/reminder-ya.model';
import { ReminderYaService } from './reminder-ya.service';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from 'app/entities/vehicle-ya';

@Component({
    selector: 'jhi-reminder-ya-update',
    templateUrl: './reminder-ya-update.component.html'
})
export class ReminderYaUpdateComponent implements OnInit {
    private _reminder: IReminderYa;
    isSaving: boolean;

    vehicles: IVehicleYa[];
    firstDateDp: any;
    recurDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reminderService: ReminderYaService,
        private vehicleService: VehicleYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reminder }) => {
            this.reminder = reminder;
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
        if (this.reminder.id !== undefined) {
            this.subscribeToSaveResponse(this.reminderService.update(this.reminder));
        } else {
            this.subscribeToSaveResponse(this.reminderService.create(this.reminder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReminderYa>>) {
        result.subscribe((res: HttpResponse<IReminderYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get reminder() {
        return this._reminder;
    }

    set reminder(reminder: IReminderYa) {
        this._reminder = reminder;
    }
}
