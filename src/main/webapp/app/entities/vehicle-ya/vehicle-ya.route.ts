import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { VehicleYa } from 'app/shared/model/vehicle-ya.model';
import { VehicleYaService } from './vehicle-ya.service';
import { VehicleYaComponent } from './vehicle-ya.component';
import { VehicleYaDetailComponent } from './vehicle-ya-detail.component';
import { VehicleYaUpdateComponent } from './vehicle-ya-update.component';
import { VehicleYaDeletePopupComponent } from './vehicle-ya-delete-dialog.component';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';

@Injectable({ providedIn: 'root' })
export class VehicleYaResolve implements Resolve<IVehicleYa> {
    constructor(private service: VehicleYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((vehicle: HttpResponse<VehicleYa>) => vehicle.body);
        }
        return Observable.of(new VehicleYa());
    }
}

export const vehicleRoute: Routes = [
    {
        path: 'vehicle-ya',
        component: VehicleYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-ya/:id/view',
        component: VehicleYaDetailComponent,
        resolve: {
            vehicle: VehicleYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-ya/new',
        component: VehicleYaUpdateComponent,
        resolve: {
            vehicle: VehicleYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vehicle-ya/:id/edit',
        component: VehicleYaUpdateComponent,
        resolve: {
            vehicle: VehicleYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiclePopupRoute: Routes = [
    {
        path: 'vehicle-ya/:id/delete',
        component: VehicleYaDeletePopupComponent,
        resolve: {
            vehicle: VehicleYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
