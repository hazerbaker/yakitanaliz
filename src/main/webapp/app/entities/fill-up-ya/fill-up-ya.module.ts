import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YakitanalizSharedModule } from 'app/shared';
import {
    FillUpYaComponent,
    FillUpYaDetailComponent,
    FillUpYaUpdateComponent,
    FillUpYaDeletePopupComponent,
    FillUpYaDeleteDialogComponent,
    fillUpRoute,
    fillUpPopupRoute
} from './';

const ENTITY_STATES = [...fillUpRoute, ...fillUpPopupRoute];

@NgModule({
    imports: [YakitanalizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FillUpYaComponent,
        FillUpYaDetailComponent,
        FillUpYaUpdateComponent,
        FillUpYaDeleteDialogComponent,
        FillUpYaDeletePopupComponent
    ],
    entryComponents: [FillUpYaComponent, FillUpYaUpdateComponent, FillUpYaDeleteDialogComponent, FillUpYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizFillUpYaModule {}
