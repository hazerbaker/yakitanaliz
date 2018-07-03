/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { YakitanalizTestModule } from '../../../test.module';
import { VehicleYaDeleteDialogComponent } from 'app/entities/vehicle-ya/vehicle-ya-delete-dialog.component';
import { VehicleYaService } from 'app/entities/vehicle-ya/vehicle-ya.service';

describe('Component Tests', () => {
    describe('VehicleYa Management Delete Component', () => {
        let comp: VehicleYaDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleYaDeleteDialogComponent>;
        let service: VehicleYaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [VehicleYaDeleteDialogComponent]
            })
                .overrideTemplate(VehicleYaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleYaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleYaService);
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
