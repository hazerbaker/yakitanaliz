import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';
import { EnumerationTypeYaService } from './enumeration-type-ya.service';

@Component({
    selector: 'jhi-enumeration-type-ya-update',
    templateUrl: './enumeration-type-ya-update.component.html'
})
export class EnumerationTypeYaUpdateComponent implements OnInit {
    private _enumerationType: IEnumerationTypeYa;
    isSaving: boolean;

    constructor(private enumerationTypeService: EnumerationTypeYaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enumerationType }) => {
            this.enumerationType = enumerationType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.enumerationType.id !== undefined) {
            this.subscribeToSaveResponse(this.enumerationTypeService.update(this.enumerationType));
        } else {
            this.subscribeToSaveResponse(this.enumerationTypeService.create(this.enumerationType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEnumerationTypeYa>>) {
        result.subscribe((res: HttpResponse<IEnumerationTypeYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get enumerationType() {
        return this._enumerationType;
    }

    set enumerationType(enumerationType: IEnumerationTypeYa) {
        this._enumerationType = enumerationType;
    }
}
