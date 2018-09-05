import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INoteYa } from 'app/shared/model/note-ya.model';

@Component({
    selector: 'jhi-note-ya-detail',
    templateUrl: './note-ya-detail.component.html'
})
export class NoteYaDetailComponent implements OnInit {
    note: INoteYa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ note }) => {
            this.note = note;
        });
    }

    previousState() {
        window.history.back();
    }
}
