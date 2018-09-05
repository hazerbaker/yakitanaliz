import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpenseYa } from 'app/shared/model/expense-ya.model';
import { ExpenseYaService } from './expense-ya.service';

@Component({
    selector: 'jhi-expense-ya-delete-dialog',
    templateUrl: './expense-ya-delete-dialog.component.html'
})
export class ExpenseYaDeleteDialogComponent {
    expense: IExpenseYa;

    constructor(private expenseService: ExpenseYaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expenseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'expenseListModification',
                content: 'Deleted an expense'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expense-ya-delete-popup',
    template: ''
})
export class ExpenseYaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ expense }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ExpenseYaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.expense = expense;
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
