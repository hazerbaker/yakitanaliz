import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html'
})
export class VehicleDetailPage {
  vehicle: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.vehicle = navParams.get('vehicle');
  }

}
