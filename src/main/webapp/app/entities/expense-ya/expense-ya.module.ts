import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OtodepomSharedModule } from 'app/shared';
import {
    ExpenseYaComponent,
    ExpenseYaDetailComponent,
    ExpenseYaUpdateComponent,
    ExpenseYaDeletePopupComponent,
    ExpenseYaDeleteDialogComponent,
    expenseRoute,
    expensePopupRoute
} from './';

const ENTITY_STATES = [...expenseRoute, ...expensePopupRoute];

@NgModule({
    imports: [OtodepomSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpenseYaComponent,
        ExpenseYaDetailComponent,
        ExpenseYaUpdateComponent,
        ExpenseYaDeleteDialogComponent,
        ExpenseYaDeletePopupComponent
    ],
    entryComponents: [ExpenseYaComponent, ExpenseYaUpdateComponent, ExpenseYaDeleteDialogComponent, ExpenseYaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtodepomExpenseYaModule {}
