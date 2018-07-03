export interface IEnumerationYa {
    id?: number;
    name?: string;
    description?: string;
    enumerationTypeId?: number;
    parentId?: number;
}

export class EnumerationYa implements IEnumerationYa {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public enumerationTypeId?: number,
        public parentId?: number
    ) {}
}
