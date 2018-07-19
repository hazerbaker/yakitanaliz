import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-vehicle-create',
  templateUrl: 'vehicle-create.html'
})
export class VehicleCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  vehicle: any;
  form: FormGroup;
  makes: any;
  models: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public api: Api) {
    this.form = formBuilder.group({
      profilePic: [''],
      fuelType: ['', Validators.required],
      cc: [''],
      transmission: [''],
      year: [''],
      make: [''],
      model: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    
    this.api.get('enumerations/bytype/VEHICLEMAKE').subscribe((res: any) => {
      this.makes = res;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getModels(e) {
    this.api.get('enumerations/byparent/'+e).subscribe((res: any) => {
      this.models = res;
      console.log(res)
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
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
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
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.api.post('vehicles',this.form.value).subscribe((res: any) => {
      console.log(res)
    }, err => {
      console.error('ERROR', err);
    });
    if (!this.form.valid) { return; }
    //this.viewCtrl.dismiss(this.form.value);
  }
}
