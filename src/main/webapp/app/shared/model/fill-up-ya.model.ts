import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface IFillUpYa {
    id?: number;
    quantity?: number;
    unitPrice?: number;
    date?: Moment;
    odometer?: number;
    partial?: boolean;
    missed?: boolean;
    note?: string;
    statsDistance?: number;
    statsQuantity?: number;
    vehicle?: IVehicleYa;
}

export class FillUpYa implements IFillUpYa {
    constructor(
        public id?: number,
        public quantity?: number,
        public unitPrice?: number,
        public date?: Moment,
        public odometer?: number,
        public partial?: boolean,
        public missed?: boolean,
        public note?: string,
        public statsDistance?: number,
        public statsQuantity?: number,
        public vehicle?: IVehicleYa
    ) {
        this.partial = false;
        this.missed = false;
    }
}
