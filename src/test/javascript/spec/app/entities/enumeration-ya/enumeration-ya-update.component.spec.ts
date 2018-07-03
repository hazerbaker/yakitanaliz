/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { EnumerationYaUpdateComponent } from 'app/entities/enumeration-ya/enumeration-ya-update.component';
import { EnumerationYaService } from 'app/entities/enumeration-ya/enumeration-ya.service';
import { EnumerationYa } from 'app/shared/model/enumeration-ya.model';

describe('Component Tests', () => {
    describe('EnumerationYa Management Update Component', () => {
        let comp: EnumerationYaUpdateComponent;
        let fixture: ComponentFixture<EnumerationYaUpdateComponent>;
        let service: EnumerationYaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [EnumerationYaUpdateComponent]
            })
                .overrideTemplate(EnumerationYaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EnumerationYaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnumerationYaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EnumerationYa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enumeration = entity;
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
                    const entity = new EnumerationYa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.enumeration = entity;
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
