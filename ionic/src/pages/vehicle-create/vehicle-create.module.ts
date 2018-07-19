import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleCreatePage } from './vehicle-create';

@NgModule({
  declarations: [
    VehicleCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    VehicleCreatePage
  ]
})
export class VehicleCreatePageModule { }
