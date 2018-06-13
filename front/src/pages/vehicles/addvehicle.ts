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

}
