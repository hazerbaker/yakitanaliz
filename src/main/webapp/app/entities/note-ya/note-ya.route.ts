import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { NoteYa } from 'app/shared/model/note-ya.model';
import { NoteYaService } from './note-ya.service';
import { NoteYaComponent } from './note-ya.component';
import { NoteYaDetailComponent } from './note-ya-detail.component';
import { NoteYaUpdateComponent } from './note-ya-update.component';
import { NoteYaDeletePopupComponent } from './note-ya-delete-dialog.component';
import { INoteYa } from 'app/shared/model/note-ya.model';

@Injectable({ providedIn: 'root' })
export class NoteYaResolve implements Resolve<INoteYa> {
    constructor(private service: NoteYaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((note: HttpResponse<NoteYa>) => note.body);
        }
        return Observable.of(new NoteYa());
    }
}

export const noteRoute: Routes = [
    {
        path: 'note-ya',
        component: NoteYaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'yakitanalizApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-ya/:id/view',
        component: NoteYaDetailComponent,
        resolve: {
            note: NoteYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-ya/new',
        component: NoteYaUpdateComponent,
        resolve: {
            note: NoteYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-ya/:id/edit',
        component: NoteYaUpdateComponent,
        resolve: {
            note: NoteYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notePopupRoute: Routes = [
    {
        path: 'note-ya/:id/delete',
        component: NoteYaDeletePopupComponent,
        resolve: {
            note: NoteYaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'yakitanalizApp.note.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
