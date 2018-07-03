/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { FillUpYaDetailComponent } from 'app/entities/fill-up-ya/fill-up-ya-detail.component';
import { FillUpYa } from 'app/shared/model/fill-up-ya.model';

describe('Component Tests', () => {
    describe('FillUpYa Management Detail Component', () => {
        let comp: FillUpYaDetailComponent;
        let fixture: ComponentFixture<FillUpYaDetailComponent>;
        const route = ({ data: of({ fillUp: new FillUpYa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [FillUpYaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FillUpYaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FillUpYaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fillUp).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
