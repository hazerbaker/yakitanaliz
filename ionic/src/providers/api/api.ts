import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    let token = localStorage.getItem('jwttoken');
    if(token !== undefined) {
      let headers = new HttpHeaders({});
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + token);
      reqOpts.headers = headers;
    }

    return this.track(this.http.get(this.url + '/' + endpoint, reqOpts));
  }

  post(endpoint: string, body: any, reqOpts?: any) {

    if (!reqOpts) {
      reqOpts = {
      };
    }

    let token = localStorage.getItem('jwttoken');
    if(token !== undefined) {
      let headers = new HttpHeaders({});
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authorization', 'Bearer ' + token);
      reqOpts.headers = headers;
    }

    return this.track(this.http.post(this.url + '/' + endpoint, body, reqOpts));
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  track(request) {
    request.subscribe((res: any) => {
    }, err => {
      if(err.status === 401) {
        localStorage.removeItem('jwttoken');
        location.reload();
      }
      else {
        console.error('ERROR', err);
      }
    });
    return request;
  }
}
