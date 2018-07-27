import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html'
})
export class VehicleDetailPage {
  vehicle: any;

  constructor(public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController) {
    this.vehicle = navParams.get('vehicle');
  }

  addItem() {
    let addModal = this.modalCtrl.create('FillUpCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.getFillUps();
      }
    })
    addModal.present();
  }

  getFillUps() {

  }
}
