import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IExpenseYa } from 'app/shared/model/expense-ya.model';
import { ExpenseYaService } from './expense-ya.service';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from 'app/entities/vehicle-ya';

@Component({
    selector: 'jhi-expense-ya-update',
    templateUrl: './expense-ya-update.component.html'
})
export class ExpenseYaUpdateComponent implements OnInit {
    private _expense: IExpenseYa;
    isSaving: boolean;

    vehicles: IVehicleYa[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private expenseService: ExpenseYaService,
        private vehicleService: VehicleYaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ expense }) => {
            this.expense = expense;
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
        if (this.expense.id !== undefined) {
            this.subscribeToSaveResponse(this.expenseService.update(this.expense));
        } else {
            this.subscribeToSaveResponse(this.expenseService.create(this.expense));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExpenseYa>>) {
        result.subscribe((res: HttpResponse<IExpenseYa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get expense() {
        return this._expense;
    }

    set expense(expense: IExpenseYa) {
        this._expense = expense;
    }
}
