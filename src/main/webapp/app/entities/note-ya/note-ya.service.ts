import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INoteYa } from 'app/shared/model/note-ya.model';

type EntityResponseType = HttpResponse<INoteYa>;
type EntityArrayResponseType = HttpResponse<INoteYa[]>;

@Injectable({ providedIn: 'root' })
export class NoteYaService {
    private resourceUrl = SERVER_API_URL + 'api/notes';

    constructor(private http: HttpClient) {}

    create(note: INoteYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(note);
        return this.http
            .post<INoteYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(note: INoteYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(note);
        return this.http
            .put<INoteYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INoteYa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INoteYa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(note: INoteYa): INoteYa {
        const copy: INoteYa = Object.assign({}, note, {
            date: note.date != null && note.date.isValid() ? note.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((note: INoteYa) => {
            note.date = note.date != null ? moment(note.date) : null;
        });
        return res;
    }
}
