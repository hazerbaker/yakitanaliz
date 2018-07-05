import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface IFillUpYa {
    id?: number;
    quantity?: number;
    unitPrice?: number;
    date?: Moment;
    totalDistance?: number;
    distance?: number;
    vehicle?: IVehicleYa;
}

export class FillUpYa implements IFillUpYa {
    constructor(
        public id?: number,
        public quantity?: number,
        public unitPrice?: number,
        public date?: Moment,
        public totalDistance?: number,
        public distance?: number,
        public vehicle?: IVehicleYa
    ) {}
}
