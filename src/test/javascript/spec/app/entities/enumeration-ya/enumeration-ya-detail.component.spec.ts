/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { EnumerationYaDetailComponent } from 'app/entities/enumeration-ya/enumeration-ya-detail.component';
import { EnumerationYa } from 'app/shared/model/enumeration-ya.model';

describe('Component Tests', () => {
    describe('EnumerationYa Management Detail Component', () => {
        let comp: EnumerationYaDetailComponent;
        let fixture: ComponentFixture<EnumerationYaDetailComponent>;
        const route = ({ data: of({ enumeration: new EnumerationYa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [EnumerationYaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EnumerationYaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnumerationYaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.enumeration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
