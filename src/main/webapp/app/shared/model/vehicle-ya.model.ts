export const enum FuelType {
    GAS = 'GAS',
    DIESEL = 'DIESEL',
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
    makeId?: number;
    modelId?: number;
}

export class VehicleYa implements IVehicleYa {
    constructor(
        public id?: number,
        public fuelType?: FuelType,
        public cc?: number,
        public year?: number,
        public transmission?: Transmission,
        public makeId?: number,
        public modelId?: number
    ) {}
}
