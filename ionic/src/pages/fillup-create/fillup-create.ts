import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  delayTimer;
  vehicle: any;

  constructor(public navCtrl: NavController, 
    navParams: NavParams, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public api: Api, 
    public translateService: TranslateService
  ) {
    this.fillUp = navParams.get('fillUp');
    this.vehicle = navParams.get('vehicle');
    
    this.form = formBuilder.group({
      date: [this.fillUp ? this.fillUp.date : new Date().toISOString(), Validators.required],
      quantity: [this.fillUp ? this.fillUp.quantity : undefined, Validators.required],
      totalPrice: [this.fillUp ? this.api.round2(this.fillUp.unitPrice * this.fillUp.quantity) : undefined, Validators.required],
      odometer: [this.fillUp ? this.fillUp.odometer : undefined, Validators.required],
      unitPrice: [this.fillUp ? this.fillUp.unitPrice : undefined, Validators.required],
      missed: this.fillUp ? this.fillUp.missed : false,
      partial: this.fillUp ? this.fillUp.partial : false,
      note: this.fillUp ? this.fillUp.note : undefined,
      id: this.fillUp ? this.fillUp.id : undefined
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid && (Math.abs((v.quantity * v.unitPrice) - v.totalPrice) < 0.5);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
  
  totalPriceChange() {
    return;
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(function(){ 
      if(this.form.value.totalPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.unitPrice = Math.round((this.form.value.totalPrice / this.form.value.quantity)*100) / 100;
        this.form.setValue(this.form.value);
      }
    }.bind(this), 500);
  }
  
  quantityChange() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(function(){ 
      if(this.form.value.totalPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.unitPrice = Math.round((this.form.value.totalPrice / this.form.value.quantity)*100) / 100;
        this.form.setValue(this.form.value);
      }
    }.bind(this), 500);
  }
  
  unitPriceChange() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(function(){ 
      if(this.form.value.unitPrice > 0 && this.form.value.totalPrice > 0) {
        this.form.value.quantity = this.api.round2(this.form.value.totalPrice / this.form.value.unitPrice);
        this.form.setValue(this.form.value);
      }
      else if(this.form.value.unitPrice > 0 && this.form.value.quantity > 0) {
        this.form.value.totalPrice = this.api.round2(this.form.value.unitPrice * this.form.value.quantity);
        this.form.setValue(this.form.value);
      }
    }.bind(this), 500);
  }
}
