import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExpenseYa } from 'app/shared/model/expense-ya.model';

type EntityResponseType = HttpResponse<IExpenseYa>;
type EntityArrayResponseType = HttpResponse<IExpenseYa[]>;

@Injectable({ providedIn: 'root' })
export class ExpenseYaService {
    private resourceUrl = SERVER_API_URL + 'api/expenses';

    constructor(private http: HttpClient) {}

    create(expense: IExpenseYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(expense);
        return this.http
            .post<IExpenseYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(expense: IExpenseYa): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(expense);
        return this.http
            .put<IExpenseYa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExpenseYa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExpenseYa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(expense: IExpenseYa): IExpenseYa {
        const copy: IExpenseYa = Object.assign({}, expense, {
            date: expense.date != null && expense.date.isValid() ? expense.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((expense: IExpenseYa) => {
            expense.date = expense.date != null ? moment(expense.date) : null;
        });
        return res;
    }
}
