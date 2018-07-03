import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';
import { EnumerationTypeYaService } from './enumeration-type-ya.service';

@Component({
    selector: 'jhi-enumeration-type-ya-delete-dialog',
    templateUrl: './enumeration-type-ya-delete-dialog.component.html'
})
export class EnumerationTypeYaDeleteDialogComponent {
    enumerationType: IEnumerationTypeYa;

    constructor(
        private enumerationTypeService: EnumerationTypeYaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enumerationTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'enumerationTypeListModification',
                content: 'Deleted an enumerationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enumeration-type-ya-delete-popup',
    template: ''
})
export class EnumerationTypeYaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enumerationType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnumerationTypeYaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.enumerationType = enumerationType;
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
