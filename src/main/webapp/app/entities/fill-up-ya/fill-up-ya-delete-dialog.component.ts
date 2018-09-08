import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFillUpYa } from 'app/shared/model/fill-up-ya.model';
import { FillUpYaService } from './fill-up-ya.service';

@Component({
    selector: 'jhi-fill-up-ya-delete-dialog',
    templateUrl: './fill-up-ya-delete-dialog.component.html'
})
export class FillUpYaDeleteDialogComponent {
    fillUp: IFillUpYa;

    constructor(private fillUpService: FillUpYaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fillUpService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fillUpListModification',
                content: 'Deleted an fillUp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fill-up-ya-delete-popup',
    template: ''
})
export class FillUpYaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fillUp }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FillUpYaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.fillUp = fillUp;
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
