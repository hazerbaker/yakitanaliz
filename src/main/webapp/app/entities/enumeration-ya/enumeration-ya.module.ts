import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtodepomSharedModule } from 'app/shared';
import {
    EnumerationYaComponent,
    EnumerationYaDetailComponent,
    EnumerationYaUpdateComponent,
    EnumerationYaDeletePopupComponent,
    EnumerationYaDeleteDialogComponent,
    enumerationRoute,
    enumerationPopupRoute
} from './';

const ENTITY_STATES = [...enumerationRoute, ...enumerationPopupRoute];

@NgModule({
    imports: [OtodepomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnumerationYaComponent,
        EnumerationYaDetailComponent,
        EnumerationYaUpdateComponent,
        EnumerationYaDeleteDialogComponent,
        EnumerationYaDeletePopupComponent
    ],
    entryComponents: [
        EnumerationYaComponent,
        EnumerationYaUpdateComponent,
        EnumerationYaDeleteDialogComponent,
        EnumerationYaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtodepomEnumerationYaModule {}
