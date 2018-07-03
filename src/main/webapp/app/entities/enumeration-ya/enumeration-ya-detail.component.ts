import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';

@Component({
    selector: 'jhi-enumeration-ya-detail',
    templateUrl: './enumeration-ya-detail.component.html'
})
export class EnumerationYaDetailComponent implements OnInit {
    enumeration: IEnumerationYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enumeration }) => {
            this.enumeration = enumeration;
        });
    }

    previousState() {
        window.history.back();
    }
}
