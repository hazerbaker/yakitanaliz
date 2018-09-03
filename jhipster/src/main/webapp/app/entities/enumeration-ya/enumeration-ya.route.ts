import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { EnumerationYa } from 'app/shared/model/enumeration-ya.model';
import { EnumerationYaService } from './enumeration-ya.service';
import { EnumerationYaComponent } from './enumeration-ya.component';
import { EnumerationYaDetailComponent } from './enumeration-ya-detail.component';
import { EnumerationYaUpdateComponent } from './enumeration-ya-update.component';
import { EnumerationYaDeletePopupComponent } from './enumeration-ya-delete-dialog.component';
import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';

@Injectable({ providedIn: 'root' })
export class EnumerationYaResolve implements Resolve<IEnumerationYa> {
    constructor(private service: EnumerationYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((enumeration: HttpResponse<EnumerationYa>) => enumeration.body);
        }
        return Observable.of(new EnumerationYa());
    }
}

export const enumerationRoute: Routes = [
    {
        path: 'enumeration-ya',
        component: EnumerationYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.enumeration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-ya/:id/view',
        component: EnumerationYaDetailComponent,
        resolve: {
            enumeration: EnumerationYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumeration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-ya/new',
        component: EnumerationYaUpdateComponent,
        resolve: {
            enumeration: EnumerationYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumeration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-ya/:id/edit',
        component: EnumerationYaUpdateComponent,
        resolve: {
            enumeration: EnumerationYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumeration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enumerationPopupRoute: Routes = [
    {
        path: 'enumeration-ya/:id/delete',
        component: EnumerationYaDeletePopupComponent,
        resolve: {
            enumeration: EnumerationYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumeration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
