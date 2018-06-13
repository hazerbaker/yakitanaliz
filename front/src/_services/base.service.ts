import { Injectable, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ToastController } from 'ionic-angular';

@Injectable()
export class BaseService implements OnInit {

    loading = false;
    loader = 0;
    enums = [];

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

    getEnums() {
        this.get('enum/all').subscribe(data => {
            let parents = [];
            for(let item of JSON.parse(data['_body'])) {
                if(item.parent != null) {
                    if(parents[item.parent.name] == undefined) parents[item.parent.name] = [];
                    parents[item.parent.name].push({
                        id: item.id,
                        name: item.name,
                        enumType: item.enumType.name
                    })
                }
            }
            for(let item of JSON.parse(data['_body'])) {
                if(item.parent == null) {
                    if(this.enums[item.enumType.name] == undefined) this.enums[item.enumType.name] = [];
                    let newEnum = {
                        id: item.id,
                        name: item.name
                    }
                    if(parents[item.name] != undefined && parents[item.name].length > 0) newEnum[parents[item.name][0].enumType] = parents[item.name]
                    this.enums[item.enumType.name].push(newEnum);
                }
            }
        });
    }
}