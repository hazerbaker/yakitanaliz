/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { YakitanalizTestModule } from '../../../test.module';
import { FillUpYaDeleteDialogComponent } from 'app/entities/fill-up-ya/fill-up-ya-delete-dialog.component';
import { FillUpYaService } from 'app/entities/fill-up-ya/fill-up-ya.service';

describe('Component Tests', () => {
    describe('FillUpYa Management Delete Component', () => {
        let comp: FillUpYaDeleteDialogComponent;
        let fixture: ComponentFixture<FillUpYaDeleteDialogComponent>;
        let service: FillUpYaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [FillUpYaDeleteDialogComponent]
            })
                .overrideTemplate(FillUpYaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FillUpYaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FillUpYaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
