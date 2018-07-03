/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { FillUpYaUpdateComponent } from 'app/entities/fill-up-ya/fill-up-ya-update.component';
import { FillUpYaService } from 'app/entities/fill-up-ya/fill-up-ya.service';
import { FillUpYa } from 'app/shared/model/fill-up-ya.model';

describe('Component Tests', () => {
    describe('FillUpYa Management Update Component', () => {
        let comp: FillUpYaUpdateComponent;
        let fixture: ComponentFixture<FillUpYaUpdateComponent>;
        let service: FillUpYaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [FillUpYaUpdateComponent]
            })
                .overrideTemplate(FillUpYaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FillUpYaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FillUpYaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FillUpYa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fillUp = entity;
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
                    const entity = new FillUpYa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fillUp = entity;
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
