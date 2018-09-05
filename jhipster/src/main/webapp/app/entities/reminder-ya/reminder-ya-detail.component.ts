import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReminderYa } from 'app/shared/model/reminder-ya.model';

@Component({
    selector: 'jhi-reminder-ya-detail',
    templateUrl: './reminder-ya-detail.component.html'
})
export class ReminderYaDetailComponent implements OnInit {
    reminder: IReminderYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reminder }) => {
            this.reminder = reminder;
        });
    }

    previousState() {
        window.history.back();
    }
}
