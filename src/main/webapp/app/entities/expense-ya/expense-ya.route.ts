import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { ExpenseYa } from 'app/shared/model/expense-ya.model';
import { ExpenseYaService } from './expense-ya.service';
import { ExpenseYaComponent } from './expense-ya.component';
import { ExpenseYaDetailComponent } from './expense-ya-detail.component';
import { ExpenseYaUpdateComponent } from './expense-ya-update.component';
import { ExpenseYaDeletePopupComponent } from './expense-ya-delete-dialog.component';
import { IExpenseYa } from 'app/shared/model/expense-ya.model';

@Injectable({ providedIn: 'root' })
export class ExpenseYaResolve implements Resolve<IExpenseYa> {
    constructor(private service: ExpenseYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((expense: HttpResponse<ExpenseYa>) => expense.body);
        }
        return Observable.of(new ExpenseYa());
    }
}

export const expenseRoute: Routes = [
    {
        path: 'expense-ya',
        component: ExpenseYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'otodepomApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expense-ya/:id/view',
        component: ExpenseYaDetailComponent,
        resolve: {
            expense: ExpenseYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'otodepomApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expense-ya/new',
        component: ExpenseYaUpdateComponent,
        resolve: {
            expense: ExpenseYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'otodepomApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expense-ya/:id/edit',
        component: ExpenseYaUpdateComponent,
        resolve: {
            expense: ExpenseYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'otodepomApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expensePopupRoute: Routes = [
    {
        path: 'expense-ya/:id/delete',
        component: ExpenseYaDeletePopupComponent,
        resolve: {
            expense: ExpenseYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'otodepomApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
