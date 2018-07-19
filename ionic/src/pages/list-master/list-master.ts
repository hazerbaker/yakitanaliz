import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public api: Api) {
    this.api.get('vehicles').subscribe((res: any) => {
      if (res.status == 'success') {
        console.log(res)
        this.currentItems = null;
      }
    }, err => {
      console.error('ERROR', err);
    });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  addItem() {
    let addModal = this.modalCtrl.create('VehicleCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log("item: ", item)
        //this.items.add(item);
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
