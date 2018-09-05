import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { ReminderYa } from 'app/shared/model/reminder-ya.model';
import { ReminderYaService } from './reminder-ya.service';
import { ReminderYaComponent } from './reminder-ya.component';
import { ReminderYaDetailComponent } from './reminder-ya-detail.component';
import { ReminderYaUpdateComponent } from './reminder-ya-update.component';
import { ReminderYaDeletePopupComponent } from './reminder-ya-delete-dialog.component';
import { IReminderYa } from 'app/shared/model/reminder-ya.model';

@Injectable({ providedIn: 'root' })
export class ReminderYaResolve implements Resolve<IReminderYa> {
    constructor(private service: ReminderYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((reminder: HttpResponse<ReminderYa>) => reminder.body);
        }
        return Observable.of(new ReminderYa());
    }
}

export const reminderRoute: Routes = [
    {
        path: 'reminder-ya',
        component: ReminderYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.reminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reminder-ya/:id/view',
        component: ReminderYaDetailComponent,
        resolve: {
            reminder: ReminderYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.reminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reminder-ya/new',
        component: ReminderYaUpdateComponent,
        resolve: {
            reminder: ReminderYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.reminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reminder-ya/:id/edit',
        component: ReminderYaUpdateComponent,
        resolve: {
            reminder: ReminderYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.reminder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reminderPopupRoute: Routes = [
    {
        path: 'reminder-ya/:id/delete',
        component: ReminderYaDeletePopupComponent,
        resolve: {
            reminder: ReminderYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.reminder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
