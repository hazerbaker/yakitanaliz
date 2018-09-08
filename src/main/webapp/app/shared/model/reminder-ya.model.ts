import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface IReminderYa {
    id?: number;
    firstDate?: Moment;
    recurDate?: Moment;
    firstDistance?: number;
    recurDistance?: string;
    vehicle?: IVehicleYa;
}

export class ReminderYa implements IReminderYa {
    constructor(
        public id?: number,
        public firstDate?: Moment,
        public recurDate?: Moment,
        public firstDistance?: number,
        public recurDistance?: string,
        public vehicle?: IVehicleYa
    ) {}
}
