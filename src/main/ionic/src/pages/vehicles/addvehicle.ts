import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BaseService } from '../../_services/base.service';

@Component({
  selector: 'addvehicle',
  templateUrl: 'addvehicle.html'
})
export class AddVehicle implements OnInit {

  make;
  model;
  models = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private base: BaseService) {

  }

  ngOnInit() {
    console.log(this.base.enums)
  }

  makeChange() {
    this.models = this.make.Model;
  }

  saveVehicle() {
    let data = {
      make: this.make,
      model: this.model
    }
    console.log('atest')
    this.base.post('vehicle',data).subscribe(data => {
      console.log(JSON.parse(data['_body']));
    });
  }


}

//TODO: araç fotoğrafı