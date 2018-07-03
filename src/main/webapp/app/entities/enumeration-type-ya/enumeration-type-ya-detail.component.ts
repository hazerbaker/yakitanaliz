import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';

@Component({
    selector: 'jhi-enumeration-type-ya-detail',
    templateUrl: './enumeration-type-ya-detail.component.html'
})
export class EnumerationTypeYaDetailComponent implements OnInit {
    enumerationType: IEnumerationTypeYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enumerationType }) => {
            this.enumerationType = enumerationType;
        });
    }

    previousState() {
        window.history.back();
    }
}
