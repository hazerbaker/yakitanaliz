import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController, ToastController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-vehicle-create',
  templateUrl: 'vehicle-create.html'
})
export class VehicleCreatePage implements OnInit {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  vehicle: any;
  form: FormGroup;
  makes: any;
  models: any;
  createSuccessString: any;
  editSuccessString: any;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public api: Api,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    this.vehicle = navParams.get('vehicle');
    this.form = formBuilder.group({
      photo: '',
      photoContentType: '',
      fuelType: ['', Validators.required],
      cc: ['', Validators.required],
      transmission: ['', Validators.required],
      year: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      id: ''
    });
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.api.get('enumerations/bytype/VEHICLEMAKE').subscribe((res: any) => {
      this.makes = res;
    }, err => {
      console.error('ERROR', err);
    });

    this.translateService.get('VEHICLE_CREATE_SUCCESS').subscribe((value) => {
      this.createSuccessString = value;
    })
    this.translateService.get('EDIT_SUCCESS').subscribe((value) => {
      this.editSuccessString = value;
    })
  }

  ngOnInit() {
    if (this.vehicle) {

      this.getModels(this.vehicle.model.parent.id);

      setTimeout(function () {
        this.form.value.photo = this.vehicle.photo;
        this.form.value.photoContentType = this.vehicle.photoContentType;
        this.form.value.fuelType = this.vehicle.fuelType;
        this.form.value.cc = this.vehicle.cc;
        this.form.value.transmission = this.vehicle.transmission;
        this.form.value.year = this.vehicle.year;
        this.form.value.make = this.vehicle.model.parent.id;
        this.form.value.model = this.vehicle.model.id;
        this.form.value.id = this.vehicle.id;
        this.form.setValue(this.form.value);
      }.bind(this), 0);

    }
  }

  getModels(e) {
    this.api.get('enumerations/byparent/' + e).subscribe((res: any) => {
      this.models = res;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'photo': data });
        this.form.patchValue({ 'photoContentType': 'image/jpg' });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      let split1 = imageData.split(":");
      if (split1.length == 2) {
        let split2 = split1[1].split(";");
        if (split2.length == 2) {
          this.form.patchValue({ 'photoContentType': split2[0] });
          let split3 = split2[1].split(",");
          if (split3.length == 2) {
            this.form.patchValue({ 'photo': split3[1] });
          }
        }
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(data:' + this.form.controls['photoContentType'].value + ';base64,' + this.form.controls['photo'].value + ')'
    //return 'url(' + this.form.controls['photo'].value + ')'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    let values = this.form.value;
    values.model = { id: values.model }
    this.api.post('vehicles', values).subscribe((res: any) => {
      let toast = this.toastCtrl.create({
        message: values.id ? this.editSuccessString : this.createSuccessString,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.viewCtrl.dismiss(this.form.value);
    });
  }
}
