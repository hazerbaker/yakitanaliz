import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { YakitanalizEnumerationYaModule } from './enumeration-ya/enumeration-ya.module';
import { YakitanalizVehicleYaModule } from './vehicle-ya/vehicle-ya.module';
import { YakitanalizFillUpYaModule } from './fill-up-ya/fill-up-ya.module';
import { YakitanalizServiceYaModule } from './service-ya/service-ya.module';
import { YakitanalizExpenseYaModule } from './expense-ya/expense-ya.module';
import { YakitanalizNoteYaModule } from './note-ya/note-ya.module';
import { YakitanalizReminderYaModule } from './reminder-ya/reminder-ya.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        YakitanalizEnumerationYaModule,
        YakitanalizVehicleYaModule,
        YakitanalizFillUpYaModule,
        YakitanalizServiceYaModule,
        YakitanalizExpenseYaModule,
        YakitanalizNoteYaModule,
        YakitanalizReminderYaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizEntityModule {}
