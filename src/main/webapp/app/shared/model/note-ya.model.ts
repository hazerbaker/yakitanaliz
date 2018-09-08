import { Moment } from 'moment';
import { IVehicleYa } from 'app/shared/model//vehicle-ya.model';

export interface INoteYa {
    id?: number;
    date?: Moment;
    totalDistance?: number;
    note?: string;
    vehicle?: IVehicleYa;
}

export class NoteYa implements INoteYa {
    constructor(
        public id?: number,
        public date?: Moment,
        public totalDistance?: number,
        public note?: string,
        public vehicle?: IVehicleYa
    ) {}
}
