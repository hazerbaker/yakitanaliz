import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnumerationYa } from 'app/shared/model/enumeration-ya.model';
import { EnumerationYaService } from './enumeration-ya.service';

@Component({
    selector: 'jhi-enumeration-ya-delete-dialog',
    templateUrl: './enumeration-ya-delete-dialog.component.html'
})
export class EnumerationYaDeleteDialogComponent {
    enumeration: IEnumerationYa;

    constructor(
        private enumerationService: EnumerationYaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enumerationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'enumerationListModification',
                content: 'Deleted an enumeration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enumeration-ya-delete-popup',
    template: ''
})
export class EnumerationYaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enumeration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnumerationYaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.enumeration = enumeration;
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
