import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { MainPage } from '../../pages';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:8080/api'; //https://yakitanaliz.herokuapp.com/api

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {

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
          return response;
        })
      .catch(
        error => _this.track(error)
      )

    return request;
  }

  post(endpoint: string, body: any, reqOpts?: any) {

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
    
    if(body.id) {
      request = _this.http.put(_this.url + '/' + endpoint, body, reqOpts);
    } else {
      request = _this.http.post(_this.url + '/' + endpoint, body, reqOpts);
    }

    request.map(
      response => {
        return response;
      })
      .catch(
        error => _this.track(error)
      )

    return request;
  }

  delete(endpoint: string, reqOpts?: any) {
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
    return Math.round(cc / 100) / 10
  }

  round(number) {
    return Math.round(number * 100) / 100
  }

  goRoot(navCtrl) {
    navCtrl.setRoot(MainPage);
    navCtrl.popToRoot();
  }
}
