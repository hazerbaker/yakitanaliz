import { IEnumerationYa } from 'app/shared/model//enumeration-ya.model';

export const enum EnumerationType {
    VEHICLEMAKE = 'VEHICLEMAKE',
    VEHICLEMODEL = 'VEHICLEMODEL'
}

export interface IEnumerationYa {
    id?: number;
    name?: string;
    description?: string;
    type?: EnumerationType;
    parent?: IEnumerationYa;
}

export class EnumerationYa implements IEnumerationYa {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: EnumerationType,
        public parent?: IEnumerationYa
    ) {}
}
