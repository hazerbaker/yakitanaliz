import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface IServiceYa {
    id?: number;
    date?: Moment;
    totalDistance?: number;
    paidAmount?: number;
    note?: string;
    vehicle?: IVehicleYa;
}

export class ServiceYa implements IServiceYa {
    constructor(
        public id?: number,
        public date?: Moment,
        public totalDistance?: number,
        public paidAmount?: number,
        public note?: string,
        public vehicle?: IVehicleYa
    ) {}
}
