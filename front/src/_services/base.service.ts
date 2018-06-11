import { Injectable, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ToastController } from 'ionic-angular';

@Injectable()
export class BaseService implements OnInit {

    loading = false;
    loader = 0;

    constructor(private http: Http, private toastr: ToastController) { }

    ngOnInit() {

    }

    post(url, json, file?) {
        this.setLoading(true);
        let promis = this.http.post('/api/' + url, file != undefined ? file : JSON.stringify(json));
        promis.subscribe(
            data => {
                this.setLoading(false);
            },
            error => {
                this.setLoading(false);
                if (error._body != undefined && error._body != "") this.toast(JSON.parse(error._body).ExceptionMessage);
            }
        );
        return promis;
    }

    get(url) {
        this.setLoading(true);
        let promis = this.http.get('/api/' + url);
        promis.subscribe(
            data => {
                this.setLoading(false);
            },
            error => {
                this.setLoading(false);
                if (error._body != undefined && error._body != "") this.toast(JSON.parse(error._body).error);
            }
        );
        return promis;
    }

    toast(message, close = false) {
        // TODO: farklı renklerde tostlar
        let toast = this.toastr.create({
            message: message,
            duration: 3000,
            showCloseButton: false
        });
        toast.present();
    }

    setLoading(up) {
        if (up) this.loader++;
        else this.loader--;
        if (this.loader > 0) {
            this.loading = true;
        }
        else {
            this.loading = false;
        }
    }
}