import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html'
})
export class VehicleDetailPage implements OnInit {
  vehicle: any;
  createSuccessString: any;
  fillUps = [];

  constructor(public navCtrl: NavController, 
    navParams: NavParams, 
    public modalCtrl: ModalController, 
    public api: Api, 
    public toastCtrl: ToastController, 
    public translateService: TranslateService
  ) {
    this.vehicle = navParams.get('vehicle');
    console.log(this.vehicle)

    this.translateService.get('FILLUP_CREATE_SUCCESS').subscribe((value) => {
      this.createSuccessString = value;
    })
  }

  ngOnInit() {
    this.getFillups();
  }

  getFillups() {
    this.api.get('fill-ups/byvehicle/'+this.vehicle.id).subscribe((data: any) => {
      this.fillUps = data;
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create('FillUpCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        item.vehicle = this.vehicle;
        console.log("item",item)
        this.api.post('fill-ups', item).subscribe((res: any) => {
          let toast = this.toastCtrl.create({
            message: this.createSuccessString,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.getFillUps();
        });
      }
    })
    addModal.present();
  }

  getFillUps() {

  }
}
