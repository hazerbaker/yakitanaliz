import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export const enum ExpenseType {
    INSURANCE = 'INSURANCE',
    TPL = 'TPL',
    TAX = 'TAX',
    MAINTENANCE = 'MAINTENANCE',
    REPAIR = 'REPAIR',
    DAMAGE = 'DAMAGE',
    OTHER = 'OTHER'
}

export interface IExpenseYa {
    id?: number;
    date?: Moment;
    type?: ExpenseType;
    odometer?: number;
    paidAmount?: number;
    note?: string;
    vehicle?: IVehicleYa;
}

export class ExpenseYa implements IExpenseYa {
    constructor(
        public id?: number,
        public date?: Moment,
        public type?: ExpenseType,
        public odometer?: number,
        public paidAmount?: number,
        public note?: string,
        public vehicle?: IVehicleYa
    ) {}
}
