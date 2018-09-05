import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReminderYa } from 'app/shared/model/reminder-ya.model';

type EntityResponseType = HttpResponse<IReminderYa>;
type EntityArrayResponseType = HttpResponse<IReminderYa[]>;

@Injectable({ providedIn: 'root' })
export class ReminderYaService {
    private resourceUrl = SERVER_API_URL + 'api/reminders';

    constructor(private http: HttpClient) {}

    create(reminder: IReminderYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reminder);
        return this.http
            .post<IReminderYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(reminder: IReminderYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reminder);
        return this.http
            .put<IReminderYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReminderYa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReminderYa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(reminder: IReminderYa): IReminderYa {
        const copy: IReminderYa = Object.assign({}, reminder, {
            firstDate: reminder.firstDate != null && reminder.firstDate.isValid() ? reminder.firstDate.format(DATE_FORMAT) : null,
            recurDate: reminder.recurDate != null && reminder.recurDate.isValid() ? reminder.recurDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.firstDate = res.body.firstDate != null ? moment(res.body.firstDate) : null;
        res.body.recurDate = res.body.recurDate != null ? moment(res.body.recurDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((reminder: IReminderYa) => {
            reminder.firstDate = reminder.firstDate != null ? moment(reminder.firstDate) : null;
            reminder.recurDate = reminder.recurDate != null ? moment(reminder.recurDate) : null;
        });
        return res;
    }
}
