import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface IExpenseYa {
    id?: number;
    date?: Moment;
    totalDistance?: number;
    paidAmount?: number;
    note?: string;
    vehicle?: IVehicleYa;
}

export class ExpenseYa implements IExpenseYa {
    constructor(
        public id?: number,
        public date?: Moment,
        public totalDistance?: number,
        public paidAmount?: number,
        public note?: string,
        public vehicle?: IVehicleYa
    ) {}
}
