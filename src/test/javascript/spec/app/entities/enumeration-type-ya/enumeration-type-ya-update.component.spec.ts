/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { EnumerationTypeYaUpdateComponent } from 'app/entities/enumeration-type-ya/enumeration-type-ya-update.component';
import { EnumerationTypeYaService } from 'app/entities/enumeration-type-ya/enumeration-type-ya.service';
import { EnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';

describe('Component Tests', () => {
    describe('EnumerationTypeYa Management Update Component', () => {
        let comp: EnumerationTypeYaUpdateComponent;
        let fixture: ComponentFixture<EnumerationTypeYaUpdateComponent>;
        let service: EnumerationTypeYaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [EnumerationTypeYaUpdateComponent]
            })
                .overrideTemplate(EnumerationTypeYaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnumerationTypeYaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnumerationTypeYaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EnumerationTypeYa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enumerationType = entity;
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
                    const entity = new EnumerationTypeYa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enumerationType = entity;
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
