import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFillUpYa } from 'app/shared/model/fill-up-ya.model';

@Component({
    selector: 'jhi-fill-up-ya-detail',
    templateUrl: './fill-up-ya-detail.component.html'
})
export class FillUpYaDetailComponent implements OnInit {
    fillUp: IFillUpYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fillUp }) => {
            this.fillUp = fillUp;
        });
    }

    previousState() {
        window.history.back();
    }
}
