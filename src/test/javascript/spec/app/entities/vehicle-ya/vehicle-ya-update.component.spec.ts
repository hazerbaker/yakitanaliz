/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { VehicleYaUpdateComponent } from 'app/entities/vehicle-ya/vehicle-ya-update.component';
import { VehicleYaService } from 'app/entities/vehicle-ya/vehicle-ya.service';
import { VehicleYa } from 'app/shared/model/vehicle-ya.model';

describe('Component Tests', () => {
    describe('VehicleYa Management Update Component', () => {
        let comp: VehicleYaUpdateComponent;
        let fixture: ComponentFixture<VehicleYaUpdateComponent>;
        let service: VehicleYaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [VehicleYaUpdateComponent]
            })
                .overrideTemplate(VehicleYaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleYaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleYaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VehicleYa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vehicle = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VehicleYa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vehicle = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
