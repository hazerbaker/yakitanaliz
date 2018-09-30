import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OtodepomEnumerationYaModule } from './enumeration-ya/enumeration-ya.module';
import { OtodepomVehicleYaModule } from './vehicle-ya/vehicle-ya.module';
import { OtodepomFillUpYaModule } from './fill-up-ya/fill-up-ya.module';
import { OtodepomServiceYaModule } from './service-ya/service-ya.module';
import { OtodepomExpenseYaModule } from './expense-ya/expense-ya.module';
import { OtodepomNoteYaModule } from './note-ya/note-ya.module';
import { OtodepomReminderYaModule } from './reminder-ya/reminder-ya.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        OtodepomEnumerationYaModule,
        OtodepomVehicleYaModule,
        OtodepomFillUpYaModule,
        OtodepomServiceYaModule,
        OtodepomExpenseYaModule,
        OtodepomNoteYaModule,
        OtodepomReminderYaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtodepomEntityModule {}
