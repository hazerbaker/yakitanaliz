import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleListPage } from './vehicle-list';

@NgModule({
  declarations: [
    VehicleListPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleListPage),
    TranslateModule.forChild()
  ],
  exports: [
    VehicleListPage
  ]
})
export class VehicleListPageModule { }
