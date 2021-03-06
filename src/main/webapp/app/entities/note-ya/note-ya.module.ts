import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtodepomSharedModule } from 'app/shared';
import {
    NoteYaComponent,
    NoteYaDetailComponent,
    NoteYaUpdateComponent,
    NoteYaDeletePopupComponent,
    NoteYaDeleteDialogComponent,
    noteRoute,
    notePopupRoute
} from './';

const ENTITY_STATES = [...noteRoute, ...notePopupRoute];

@NgModule({
    imports: [OtodepomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NoteYaComponent, NoteYaDetailComponent, NoteYaUpdateComponent, NoteYaDeleteDialogComponent, NoteYaDeletePopupComponent],
    entryComponents: [NoteYaComponent, NoteYaUpdateComponent, NoteYaDeleteDialogComponent, NoteYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtodepomNoteYaModule {}
