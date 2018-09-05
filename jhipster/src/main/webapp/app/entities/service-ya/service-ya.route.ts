import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { ServiceYa } from 'app/shared/model/service-ya.model';
import { ServiceYaService } from './service-ya.service';
import { ServiceYaComponent } from './service-ya.component';
import { ServiceYaDetailComponent } from './service-ya-detail.component';
import { ServiceYaUpdateComponent } from './service-ya-update.component';
import { ServiceYaDeletePopupComponent } from './service-ya-delete-dialog.component';
import { IServiceYa } from 'app/shared/model/service-ya.model';

@Injectable({ providedIn: 'root' })
export class ServiceYaResolve implements Resolve<IServiceYa> {
    constructor(private service: ServiceYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((service: HttpResponse<ServiceYa>) => service.body);
        }
        return Observable.of(new ServiceYa());
    }
}

export const serviceRoute: Routes = [
    {
        path: 'service-ya',
        component: ServiceYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-ya/:id/view',
        component: ServiceYaDetailComponent,
        resolve: {
            service: ServiceYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-ya/new',
        component: ServiceYaUpdateComponent,
        resolve: {
            service: ServiceYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'service-ya/:id/edit',
        component: ServiceYaUpdateComponent,
        resolve: {
            service: ServiceYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.service.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicePopupRoute: Routes = [
    {
        path: 'service-ya/:id/delete',
        component: ServiceYaDeletePopupComponent,
        resolve: {
            service: ServiceYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.service.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
