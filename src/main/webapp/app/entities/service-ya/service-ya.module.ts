import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtodepomSharedModule } from 'app/shared';
import {
    ServiceYaComponent,
    ServiceYaDetailComponent,
    ServiceYaUpdateComponent,
    ServiceYaDeletePopupComponent,
    ServiceYaDeleteDialogComponent,
    serviceRoute,
    servicePopupRoute
} from './';

const ENTITY_STATES = [...serviceRoute, ...servicePopupRoute];

@NgModule({
    imports: [OtodepomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServiceYaComponent,
        ServiceYaDetailComponent,
        ServiceYaUpdateComponent,
        ServiceYaDeleteDialogComponent,
        ServiceYaDeletePopupComponent
    ],
    entryComponents: [ServiceYaComponent, ServiceYaUpdateComponent, ServiceYaDeleteDialogComponent, ServiceYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtodepomServiceYaModule {}
