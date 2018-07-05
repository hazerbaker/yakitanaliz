import { IEnumerationTypeYa } from 'app/shared/model//enumeration-type-ya.model';
import { IEnumerationYa } from 'app/shared/model//enumeration-ya.model';

export interface IEnumerationYa {
    id?: number;
    name?: string;
    description?: string;
    enumerationType?: IEnumerationTypeYa;
    parent?: IEnumerationYa;
}

export class EnumerationYa implements IEnumerationYa {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public enumerationType?: IEnumerationTypeYa,
        public parent?: IEnumerationYa
    ) {}
}
