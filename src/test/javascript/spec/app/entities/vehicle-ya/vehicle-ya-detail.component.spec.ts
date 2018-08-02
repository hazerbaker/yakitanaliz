/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { YakitanalizTestModule } from '../../../test.module';
import { VehicleYaDetailComponent } from 'app/entities/vehicle-ya/vehicle-ya-detail.component';
import { VehicleYa } from 'app/shared/model/vehicle-ya.model';

describe('Component Tests', () => {
    describe('VehicleYa Management Detail Component', () => {
        let comp: VehicleYaDetailComponent;
        let fixture: ComponentFixture<VehicleYaDetailComponent>;
        const route = ({ data: of({ vehicle: new VehicleYa(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [YakitanalizTestModule],
                declarations: [VehicleYaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VehicleYaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VehicleYaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vehicle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
