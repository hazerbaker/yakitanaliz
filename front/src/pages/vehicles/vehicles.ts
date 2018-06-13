import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseService } from '../../_services/base.service';
import { AddVehicle } from './addvehicle';

@Component({
  selector: 'vehicles',
  templateUrl: 'vehicles.html'
})
export class Vehicles implements OnInit {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private base: BaseService) {
    
    this.selectedItem = navParams.get('item');

    this.items = [];
    // for (let i = 1; i < 5; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: 'car'
    //   });
    // }
  }

  ngOnInit() {
    this.base.get('vehicle/all').subscribe(data => {
      console.log(JSON.parse(data['_body']));
    });
  }

  addVehicle() {
    this.navCtrl.push(AddVehicle, {

    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Vehicles, {
      item: item
    });
  }
}
