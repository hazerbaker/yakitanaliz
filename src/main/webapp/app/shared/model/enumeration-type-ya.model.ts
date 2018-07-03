export interface IEnumerationTypeYa {
    id?: number;
    name?: string;
    description?: string;
}

export class EnumerationTypeYa implements IEnumerationTypeYa {
    constructor(public id?: number, public name?: string, public description?: string) {}
}
