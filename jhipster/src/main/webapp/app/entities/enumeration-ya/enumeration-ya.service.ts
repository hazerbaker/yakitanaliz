import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';

type EntityResponseType = HttpResponse<IEnumerationYa>;
type EntityArrayResponseType = HttpResponse<IEnumerationYa[]>;

@Injectable({ providedIn: 'root' })
export class EnumerationYaService {
    private resourceUrl = SERVER_API_URL + 'api/enumerations';

    constructor(private http: HttpClient) {}

    create(enumeration: IEnumerationYa): Observable<EntityResponseType> {
        return this.http.post<IEnumerationYa>(this.resourceUrl, enumeration, { observe: 'response' });
    }

    update(enumeration: IEnumerationYa): Observable<EntityResponseType> {
        return this.http.put<IEnumerationYa>(this.resourceUrl, enumeration, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEnumerationYa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEnumerationYa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
