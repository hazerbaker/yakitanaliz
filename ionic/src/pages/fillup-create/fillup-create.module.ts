import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FillUpCreatePage } from './fillup-create';

@NgModule({
  declarations: [
    FillUpCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FillUpCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    FillUpCreatePage
  ]
})
export class FillUpCreatePageModule { }
