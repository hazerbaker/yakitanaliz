import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListPage implements OnInit {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public api: Api) {

  }

  ngOnInit() {
    this.getVehicles();
  }

  ionViewDidLoad() {
  }

  getVehicles() {
    this.api.get('vehicles').subscribe((data: any) => {
      this.currentItems = data;
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create('VehicleCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.getVehicles();
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    //this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
