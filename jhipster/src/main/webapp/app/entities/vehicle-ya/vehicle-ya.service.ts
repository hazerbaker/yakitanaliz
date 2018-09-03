import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVehicleYa } from 'app/shared/model/vehicle-ya.model';

type EntityResponseType = HttpResponse<IVehicleYa>;
type EntityArrayResponseType = HttpResponse<IVehicleYa[]>;

@Injectable({ providedIn: 'root' })
export class VehicleYaService {
    private resourceUrl = SERVER_API_URL + 'api/vehicles';

    constructor(private http: HttpClient) {}

    create(vehicle: IVehicleYa): Observable<EntityResponseType> {
        return this.http.post<IVehicleYa>(this.resourceUrl, vehicle, { observe: 'response' });
    }

    update(vehicle: IVehicleYa): Observable<EntityResponseType> {
        return this.http.put<IVehicleYa>(this.resourceUrl, vehicle, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVehicleYa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVehicleYa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
