/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { EnumerationTypeYaDetailComponent } from 'app/entities/enumeration-type-ya/enumeration-type-ya-detail.component';
import { EnumerationTypeYa } from 'app/shared/model/enumeration-type-ya.model';

describe('Component Tests', () => {
    describe('EnumerationTypeYa Management Detail Component', () => {
        let comp: EnumerationTypeYaDetailComponent;
        let fixture: ComponentFixture<EnumerationTypeYaDetailComponent>;
        const route = ({ data: of({ enumerationType: new EnumerationTypeYa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [EnumerationTypeYaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EnumerationTypeYaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EnumerationTypeYaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.enumerationType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
