import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListPage {
  currentItems: Item[];
  deleteSuccessString: any;
  deleteFailureString: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public api: Api,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('VEHICLE_DELETE_SUCCESS').subscribe((value) => {
      this.deleteSuccessString = value;
    })
    this.translateService.get('VEHICLE_DELETE_FAILURE').subscribe((value) => {
      this.deleteFailureString = value;
    })
  }

  getItems() {
    this.api.get('vehicles').subscribe((data: any) => {
      this.currentItems = data;
    });
  }

  myCallbackFunction(_params) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create('VehicleCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.getItems();
      }
    })
    addModal.present();
  }

  deleteItem(item) {
    this.api.delete('vehicles/' + item.id).subscribe(
      (res: any) => {
        let toast = this.toastCtrl.create({
          message: this.deleteSuccessString,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        this.getItems();
      },
      error => {
        let toast = this.toastCtrl.create({
          message: this.deleteFailureString,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        this.getItems();
      }
    );
  }

  openItem(item: Item) {
    this.navCtrl.push('VehicleDetailPage', {
      vehicle: item
    });
  }

  ionViewWillEnter() {
    this.getItems();
  }
}
