import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { EnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';
import { EnumerationTypeYaService } from './enumeration-type-ya.service';
import { EnumerationTypeYaComponent } from './enumeration-type-ya.component';
import { EnumerationTypeYaDetailComponent } from './enumeration-type-ya-detail.component';
import { EnumerationTypeYaUpdateComponent } from './enumeration-type-ya-update.component';
import { EnumerationTypeYaDeletePopupComponent } from './enumeration-type-ya-delete-dialog.component';
import { IEnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';

@Injectable({ providedIn: 'root' })
export class EnumerationTypeYaResolve implements Resolve<IEnumerationTypeYa> {
    constructor(private service: EnumerationTypeYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((enumerationType: HttpResponse<EnumerationTypeYa>) => enumerationType.body);
        }
        return Observable.of(new EnumerationTypeYa());
    }
}

export const enumerationTypeRoute: Routes = [
    {
        path: 'enumeration-type-ya',
        component: EnumerationTypeYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.enumerationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-type-ya/:id/view',
        component: EnumerationTypeYaDetailComponent,
        resolve: {
            enumerationType: EnumerationTypeYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumerationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-type-ya/new',
        component: EnumerationTypeYaUpdateComponent,
        resolve: {
            enumerationType: EnumerationTypeYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumerationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enumeration-type-ya/:id/edit',
        component: EnumerationTypeYaUpdateComponent,
        resolve: {
            enumerationType: EnumerationTypeYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumerationType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enumerationTypePopupRoute: Routes = [
    {
        path: 'enumeration-type-ya/:id/delete',
        component: EnumerationTypeYaDeletePopupComponent,
        resolve: {
            enumerationType: EnumerationTypeYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.enumerationType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
