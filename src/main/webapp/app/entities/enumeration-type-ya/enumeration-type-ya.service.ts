import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';

type EntityResponseType = HttpResponse<IEnumerationTypeYa>;
type EntityArrayResponseType = HttpResponse<IEnumerationTypeYa[]>;

@Injectable({ providedIn: 'root' })
export class EnumerationTypeYaService {
    private resourceUrl = SERVER_API_URL + 'api/enumeration-types';

    constructor(private http: HttpClient) {}

    create(enumerationType: IEnumerationTypeYa): Observable<EntityResponseType> {
        return this.http.post<IEnumerationTypeYa>(this.resourceUrl, enumerationType, { observe: 'response' });
    }

    update(enumerationType: IEnumerationTypeYa): Observable<EntityResponseType> {
        return this.http.put<IEnumerationTypeYa>(this.resourceUrl, enumerationType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnumerationTypeYa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnumerationTypeYa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
