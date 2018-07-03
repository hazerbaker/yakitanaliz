import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFillUpYa } from 'app/shared/model/fill-up-ya.model';

type EntityResponseType = HttpResponse<IFillUpYa>;
type EntityArrayResponseType = HttpResponse<IFillUpYa[]>;

@Injectable({ providedIn: 'root' })
export class FillUpYaService {
    private resourceUrl = SERVER_API_URL + 'api/fill-ups';

    constructor(private http: HttpClient) {}

    create(fillUp: IFillUpYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fillUp);
        return this.http
            .post<IFillUpYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(fillUp: IFillUpYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fillUp);
        return this.http
            .put<IFillUpYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFillUpYa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFillUpYa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fillUp: IFillUpYa): IFillUpYa {
        const copy: IFillUpYa = Object.assign({}, fillUp, {
            date: fillUp.date != null && fillUp.date.isValid() ? fillUp.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fillUp: IFillUpYa) => {
            fillUp.date = fillUp.date != null ? moment(fillUp.date) : null;
        });
        return res;
    }
}
