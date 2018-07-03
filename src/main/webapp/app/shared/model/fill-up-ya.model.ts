import { Moment } from 'moment';

export interface IFillUpYa {
    id?: number;
    quantity?: number;
    unitPrice?: number;
    date?: Moment;
    totalDistance?: number;
    distance?: number;
    vehicleId?: number;
}

export class FillUpYa implements IFillUpYa {
    constructor(
        public id?: number,
        public quantity?: number,
        public unitPrice?: number,
        public date?: Moment,
        public totalDistance?: number,
        public distance?: number,
        public vehicleId?: number
    ) {}
}
