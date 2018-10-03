import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: { login: string, email: string, password: string, langKey: string } = {
    login: 'test',
    email: 'test@example.com',
    password: 'qqqq',
    langKey: 'tr'
  };

  // Our translated text strings
  private signupErrorString: string;
  private signupSuccessString: string;
  private signupExistsString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
        this.signupErrorString = value;
      })
      this.translateService.get('SIGNUP_SUCCESS').subscribe((value) => {
        this.signupSuccessString = value;
      })
      this.translateService.get('SIGNUP_EXISTS').subscribe((value) => {
        this.signupExistsString = value;
      })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: this.signupSuccessString,
        duration: 3000,
        cssClass: 'toast-success',
        position: 'top'
      });
      toast.present();
      this.navCtrl.push('LoginPage');
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err.error.errorKey == 'userexists' ? this.signupExistsString : this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
