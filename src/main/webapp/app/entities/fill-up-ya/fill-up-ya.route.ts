import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { FillUpYa } from 'app/shared/model/fill-up-ya.model';
import { FillUpYaService } from './fill-up-ya.service';
import { FillUpYaComponent } from './fill-up-ya.component';
import { FillUpYaDetailComponent } from './fill-up-ya-detail.component';
import { FillUpYaUpdateComponent } from './fill-up-ya-update.component';
import { FillUpYaDeletePopupComponent } from './fill-up-ya-delete-dialog.component';
import { IFillUpYa } from 'app/shared/model/fill-up-ya.model';

@Injectable({ providedIn: 'root' })
export class FillUpYaResolve implements Resolve<IFillUpYa> {
    constructor(private service: FillUpYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((fillUp: HttpResponse<FillUpYa>) => fillUp.body);
        }
        return Observable.of(new FillUpYa());
    }
}

export const fillUpRoute: Routes = [
    {
        path: 'fill-up-ya',
        component: FillUpYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.fillUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fill-up-ya/:id/view',
        component: FillUpYaDetailComponent,
        resolve: {
            fillUp: FillUpYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.fillUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fill-up-ya/new',
        component: FillUpYaUpdateComponent,
        resolve: {
            fillUp: FillUpYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.fillUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fill-up-ya/:id/edit',
        component: FillUpYaUpdateComponent,
        resolve: {
            fillUp: FillUpYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.fillUp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fillUpPopupRoute: Routes = [
    {
        path: 'fill-up-ya/:id/delete',
        component: FillUpYaDeletePopupComponent,
        resolve: {
            fillUp: FillUpYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.fillUp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
