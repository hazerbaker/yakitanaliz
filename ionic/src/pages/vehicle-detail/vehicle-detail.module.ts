import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleDetailPage } from './vehicle-detail';

@NgModule({
  declarations: [
    VehicleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    VehicleDetailPage
  ]
})
export class VehicleDetailPageModule { }
