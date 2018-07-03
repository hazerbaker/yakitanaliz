/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { YakitanalizTestModule } from '../../../test.module';
import { EnumerationYaDeleteDialogComponent } from 'app/entities/enumeration-ya/enumeration-ya-delete-dialog.component';
import { EnumerationYaService } from 'app/entities/enumeration-ya/enumeration-ya.service';

describe('Component Tests', () => {
    describe('EnumerationYa Management Delete Component', () => {
        let comp: EnumerationYaDeleteDialogComponent;
        let fixture: ComponentFixture<EnumerationYaDeleteDialogComponent>;
        let service: EnumerationYaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [EnumerationYaDeleteDialogComponent]
            })
                .overrideTemplate(EnumerationYaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnumerationYaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnumerationYaService);
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
