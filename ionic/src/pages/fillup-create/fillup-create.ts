import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-fillup-create',
  templateUrl: 'fillup-create.html'
})
export class FillUpCreatePage {

  isReadyToSave: boolean;
  fillUp: any;
  form: FormGroup;
  createSuccessString: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public api: Api, public toastCtrl: ToastController, public translateService: TranslateService) {
    this.form = formBuilder.group({
      date: new Date().toISOString()
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.translateService.get('FILLUP_CREATE_SUCCESS').subscribe((value) => {
      this.createSuccessString = value;
    })
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    let values = this.form.value;
    values.model = { id: values.model }
    this.api.post('fillups', values).subscribe((res: any) => {
      let toast = this.toastCtrl.create({
        message: this.createSuccessString,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
      this.viewCtrl.dismiss(this.form.value);
    });
  }
}
