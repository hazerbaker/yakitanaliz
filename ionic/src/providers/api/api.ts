import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { MainPage } from '../../pages';
import { LoadingController } from 'ionic-angular';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://yakitanaliz.herokuapp.com/api'; // https://yakitanaliz.herokuapp.com/api / http://localhost:8080/api
  loader;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {

  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    this.loading(true);

    let _this = this;

    if (!reqOpts) {
      reqOpts = {
      };
    }

    let token = localStorage.getItem('jwttoken');
    if (token !== undefined) {
      let headers = new HttpHeaders({});
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + token);
      reqOpts.headers = headers;
    }

    let request = _this.http.get(_this.url + '/' + endpoint, reqOpts)
      .map(
        response => {
          this.loading(false);
          return response;
        })
      .catch(
        error => _this.track(error)
      )

    return request;
  }

  post(endpoint: string, body: any, reqOpts?: any) {

    this.loading(true);

    let _this = this;

    if (!reqOpts) {
      reqOpts = {
      };
    }

    let token = localStorage.getItem('jwttoken');
    if (token !== undefined) {
      let headers = new HttpHeaders({});
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + token);
      reqOpts.headers = headers;
    }

    let request;

    if (body.id) {
      request = _this.http.put(_this.url + '/' + endpoint, body, reqOpts).map(
        response => {
          this.loading(false);
          return response;
        })
        .catch(
          error => _this.track(error)
        );
    } else {
      request = _this.http.post(_this.url + '/' + endpoint, body, reqOpts).map(
        response => {
          this.loading(false);
          return response;
        })
        .catch(
          error => _this.track(error)
        );
    }

    return request;
  }

  delete(endpoint: string, reqOpts?: any) {

    this.loading(true);

    let _this = this;

    if (!reqOpts) {
      reqOpts = {
      };
    }

    let token = localStorage.getItem('jwttoken');
    if (token !== undefined) {
      let headers = new HttpHeaders({});
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + token);
      reqOpts.headers = headers;
    }

    let request = _this.http.delete(_this.url + '/' + endpoint, reqOpts)
      .map(
        response => {
          this.loading(false);
          return response;
        })
      .catch(
        error => {
          return _this.track(error);
        }
      )

    return request;
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  track(err) {
    this.loading(false);
    if (err.status === 401) {
      localStorage.removeItem('jwttoken');
      location.href = "/";
      //location.reload();
    }
    else {
      console.error('ERROR', err);
    }
    return err;
  }

  roundcc(cc) {
    return (Math.round(cc / 100) / 10).toFixed(1)
  }

  round(number) {
    return Math.round(number)
  }

  round1(number) {
    return (Math.round(number * 100) / 100).toFixed(1)
  }

  round2(number) {
    return (Math.round(number * 100) / 100).toFixed(2)
  }

  goRoot(navCtrl) {
    navCtrl.setRoot(MainPage);
    navCtrl.popToRoot();
  }

  loading(flag) {
    if (flag) {
      if (this.loader == null) {
        this.loader = this.loadingCtrl.create({
          content: "Loading..."
        });
        this.loader.present();
      }
    }
    else {
      if (this.loader != null) {
        this.loader.dismiss();
        this.loader = null;
      }
    }
  }
}
