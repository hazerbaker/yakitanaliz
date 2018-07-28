import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public api: Api, public translateService: TranslateService) {
    this.form = formBuilder.group({
      date: new Date().toISOString(),
      quantity: undefined,
      totalPrice: undefined,
      totalDistance: undefined,
      unitPrice: undefined
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
    this.viewCtrl.dismiss(this.form.value);
  }
  
  totalPriceChange() {
    setTimeout(function(){ 
      if(this.form.value.totalPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.unitPrice = Math.round((this.form.value.totalPrice / this.form.value.quantity)*100) / 100;
        this.form.setValue(this.form.value);
      }
    }.bind(this), 0);
  }
  
  quantityChange() {
    setTimeout(function(){ 
      if(this.form.value.totalPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.unitPrice = Math.round((this.form.value.totalPrice / this.form.value.quantity)*100) / 100;
        this.form.setValue(this.form.value);
      }
    }.bind(this), 0);
  }
  
  unitPriceChange() {
    setTimeout(function(){ 
      if(this.form.value.unitPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.totalPrice = Math.round((this.form.value.unitPrice * this.form.value.quantity)*100) / 100;
        this.form.setValue(this.form.value);
      }
    }.bind(this), 0);
  }
}