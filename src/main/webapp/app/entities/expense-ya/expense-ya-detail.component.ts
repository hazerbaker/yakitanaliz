import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpenseYa } from 'app/shared/model/expense-ya.model';

@Component({
    selector: 'jhi-expense-ya-detail',
    templateUrl: './expense-ya-detail.component.html'
})
export class ExpenseYaDetailComponent implements OnInit {
    expense: IExpenseYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expense }) => {
            this.expense = expense;
        });
    }

    previousState() {
        window.history.back();
    }
}
