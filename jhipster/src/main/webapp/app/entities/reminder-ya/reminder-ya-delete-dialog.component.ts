import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReminderYa } from 'app/shared/model/reminder-ya.model';
import { ReminderYaService } from './reminder-ya.service';

@Component({
    selector: 'jhi-reminder-ya-delete-dialog',
    templateUrl: './reminder-ya-delete-dialog.component.html'
})
export class ReminderYaDeleteDialogComponent {
    reminder: IReminderYa;

    constructor(private reminderService: ReminderYaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reminderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reminderListModification',
                content: 'Deleted an reminder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reminder-ya-delete-popup',
    template: ''
})
export class ReminderYaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reminder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReminderYaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.reminder = reminder;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
