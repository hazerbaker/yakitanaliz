import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceYa } from 'app/shared/model/service-ya.model';

@Component({
    selector: 'jhi-service-ya-detail',
    templateUrl: './service-ya-detail.component.html'
})
export class ServiceYaDetailComponent implements OnInit {
    service: IServiceYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ service }) => {
            this.service = service;
        });
    }

    previousState() {
        window.history.back();
    }
}
