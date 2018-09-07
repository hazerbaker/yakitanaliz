import { IEnumerationYa } from 'app/shared/model//enumeration-ya.model';
import { IUser } from 'app/core/user/user.model';

export const enum FuelType {
    GAS = 'GAS',
    DIESEL = 'DIESEL',
    LPG = 'LPG',
    HYBRID = 'HYBRID',
    ELECTRIC = 'ELECTRIC'
}

export const enum Transmission {
    AUTO = 'AUTO',
    MANUAL = 'MANUAL'
}

export interface IVehicleYa {
    id?: number;
    fuelType?: FuelType;
    cc?: number;
    year?: number;
    transmission?: Transmission;
    photoContentType?: string;
    photo?: any;
    statsDistance?: number;
    statsQuantity?: number;
    totalExpense?: number;
    model?: IEnumerationYa;
    user?: IUser;
}

export class VehicleYa implements IVehicleYa {
    constructor(
        public id?: number,
        public fuelType?: FuelType,
        public cc?: number,
        public year?: number,
        public transmission?: Transmission,
        public photoContentType?: string,
        public photo?: any,
        public statsDistance?: number,
        public statsQuantity?: number,
        public totalExpense?: number,
        public model?: IEnumerationYa,
        public user?: IUser
    ) {}
}
