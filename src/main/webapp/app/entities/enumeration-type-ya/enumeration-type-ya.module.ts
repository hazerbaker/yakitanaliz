import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YakitanalizSharedModule } from 'app/shared';
import {
    EnumerationTypeYaComponent,
    EnumerationTypeYaDetailComponent,
    EnumerationTypeYaUpdateComponent,
    EnumerationTypeYaDeletePopupComponent,
    EnumerationTypeYaDeleteDialogComponent,
    enumerationTypeRoute,
    enumerationTypePopupRoute
} from './';

const ENTITY_STATES = [...enumerationTypeRoute, ...enumerationTypePopupRoute];

@NgModule({
    imports: [YakitanalizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnumerationTypeYaComponent,
        EnumerationTypeYaDetailComponent,
        EnumerationTypeYaUpdateComponent,
        EnumerationTypeYaDeleteDialogComponent,
        EnumerationTypeYaDeletePopupComponent
    ],
    entryComponents: [
        EnumerationTypeYaComponent,
        EnumerationTypeYaUpdateComponent,
        EnumerationTypeYaDeleteDialogComponent,
        EnumerationTypeYaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizEnumerationTypeYaModule {}
