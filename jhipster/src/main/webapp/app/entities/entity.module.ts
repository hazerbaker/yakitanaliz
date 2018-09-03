import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { YakitanalizEnumerationYaModule } from './enumeration-ya/enumeration-ya.module';
import { YakitanalizVehicleYaModule } from './vehicle-ya/vehicle-ya.module';
import { YakitanalizFillUpYaModule } from './fill-up-ya/fill-up-ya.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        YakitanalizEnumerationYaModule,
        YakitanalizVehicleYaModule,
        YakitanalizFillUpYaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizEntityModule {}
