import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YakitanalizSharedModule } from 'app/shared';
import { YakitanalizAdminModule } from 'app/admin/admin.module';
import {
    VehicleYaComponent,
    VehicleYaDetailComponent,
    VehicleYaUpdateComponent,
    VehicleYaDeletePopupComponent,
    VehicleYaDeleteDialogComponent,
    vehicleRoute,
    vehiclePopupRoute
} from './';

const ENTITY_STATES = [...vehicleRoute, ...vehiclePopupRoute];

@NgModule({
    imports: [YakitanalizSharedModule, YakitanalizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VehicleYaComponent,
        VehicleYaDetailComponent,
        VehicleYaUpdateComponent,
        VehicleYaDeleteDialogComponent,
        VehicleYaDeletePopupComponent
    ],
    entryComponents: [VehicleYaComponent, VehicleYaUpdateComponent, VehicleYaDeleteDialogComponent, VehicleYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizVehicleYaModule {}