import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INoteYa } from 'app/shared/model/note-ya.model';
import { NoteYaService } from './note-ya.service';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from 'app/entities/vehicle-ya';

@Component({
    selector: 'jhi-note-ya-update',
    templateUrl: './note-ya-update.component.html'
})
export class NoteYaUpdateComponent implements OnInit {
    private _note: INoteYa;
    isSaving: boolean;

    vehicles: IVehicleYa[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private noteService: NoteYaService,
        private vehicleService: VehicleYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ note }) => {
            this.note = note;
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
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(this.noteService.create(this.note));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INoteYa>>) {
        result.subscribe((res: HttpResponse<INoteYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get note() {
        return this._note;
    }

    set note(note: INoteYa) {
        this._note = note;
    }
}
