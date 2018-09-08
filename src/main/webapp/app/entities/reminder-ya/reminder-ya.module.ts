import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { YakitanalizSharedModule } from 'app/shared';
import {
    ReminderYaComponent,
    ReminderYaDetailComponent,
    ReminderYaUpdateComponent,
    ReminderYaDeletePopupComponent,
    ReminderYaDeleteDialogComponent,
    reminderRoute,
    reminderPopupRoute
} from './';

const ENTITY_STATES = [...reminderRoute, ...reminderPopupRoute];

@NgModule({
    imports: [YakitanalizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReminderYaComponent,
        ReminderYaDetailComponent,
        ReminderYaUpdateComponent,
        ReminderYaDeleteDialogComponent,
        ReminderYaDeletePopupComponent
    ],
    entryComponents: [ReminderYaComponent, ReminderYaUpdateComponent, ReminderYaDeleteDialogComponent, ReminderYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YakitanalizReminderYaModule {}
