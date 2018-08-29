import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html'
})
export class VehicleDetailPage {
  vehicle: any;
  createSuccessString: any;
  deleteSuccessString: any;
  editSuccessString: any;
  fillUps = [];

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    public modalCtrl: ModalController,
    public api: Api,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    this.vehicle = navParams.get('vehicle');

    this.translateService.get('FILLUP_CREATE_SUCCESS').subscribe((value) => {
      this.createSuccessString = value;
    })
    this.translateService.get('FILLUP_DELETE_SUCCESS').subscribe((value) => {
      this.deleteSuccessString = value;
    })
    this.translateService.get('EDIT_SUCCESS').subscribe((value) => {
      this.editSuccessString = value;
    })
  }

  ionViewDidLoad() {
    if (this.vehicle) this.getItems();
    else {
      this.api.goRoot(this.navCtrl);
    }
  }

  getItems() {
    this.api.get('fill-ups/byvehicle/' + this.vehicle.id).subscribe((data: any) => {
      this.fillUps = data;
    });
  }

  getItem() {
    this.api.get('vehicles/' + this.vehicle.id).subscribe((data: any) => {
      this.vehicle = data;
    });
  }

  deleteItem(item) {
    this.api.delete('fill-ups/' + item.id).subscribe((res: any) => {
      let toast = this.toastCtrl.create({
        message: this.deleteSuccessString,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.getItems();
    });
  }

  editFillUp(editItem?) {
    let editModal = this.modalCtrl.create('FillUpCreatePage', {
      fillUp: editItem
    });
    editModal.onDidDismiss(item => {
      if (item) {
        item.vehicle = this.vehicle;
        this.api.post('fill-ups', item).subscribe((res: any) => {
          let toast = this.toastCtrl.create({
            message: editItem ? this.editSuccessString : this.createSuccessString,
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          this.getItems();
        });
      }
    })
    editModal.present();
  }

  editVehicle(editItem?) {
    let editModal = this.modalCtrl.create('VehicleCreatePage', {
      vehicle: editItem
    });
    editModal.onDidDismiss(item => {
      this.getItem();
    })
    editModal.present();
  }

}
