import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';
import { EnumerationYaService } from './enumeration-ya.service';

@Component({
    selector: 'jhi-enumeration-ya-update',
    templateUrl: './enumeration-ya-update.component.html'
})
export class EnumerationYaUpdateComponent implements OnInit {
    private _enumeration: IEnumerationYa;
    isSaving: boolean;

    enumerations: IEnumerationYa[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private enumerationService: EnumerationYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enumeration }) => {
            this.enumeration = enumeration;
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
        if (this.enumeration.id !== undefined) {
            this.subscribeToSaveResponse(this.enumerationService.update(this.enumeration));
        } else {
            this.subscribeToSaveResponse(this.enumerationService.create(this.enumeration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEnumerationYa>>) {
        result.subscribe((res: HttpResponse<IEnumerationYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get enumeration() {
        return this._enumeration;
    }

    set enumeration(enumeration: IEnumerationYa) {
        this._enumeration = enumeration;
    }
}
