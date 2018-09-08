import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IServiceYa } from 'app/shared/model/service-ya.model';

type EntityResponseType = HttpResponse<IServiceYa>;
type EntityArrayResponseType = HttpResponse<IServiceYa[]>;

@Injectable({ providedIn: 'root' })
export class ServiceYaService {
    private resourceUrl = SERVER_API_URL + 'api/services';

    constructor(private http: HttpClient) {}

    create(service: IServiceYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(service);
        return this.http
            .post<IServiceYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(service: IServiceYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(service);
        return this.http
            .put<IServiceYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IServiceYa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IServiceYa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(service: IServiceYa): IServiceYa {
        const copy: IServiceYa = Object.assign({}, service, {
            date: service.date != null && service.date.isValid() ? service.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((service: IServiceYa) => {
            service.date = service.date != null ? moment(service.date) : null;
        });
        return res;
    }
}
