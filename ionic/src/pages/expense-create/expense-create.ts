import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-expense-create',
  templateUrl: 'expense-create.html'
})
export class ExpenseCreatePage {

  isReadyToSave: boolean;
  expense: any;
  form: FormGroup;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public api: Api,
    public translateService: TranslateService
  ) {
    this.expense = navParams.get('expense');

    this.form = formBuilder.group({
      date: new Date().toISOString(),
      type: '',
      odometer: '',
      paidAmount:'',
      note: '',
      id: ''
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    if (this.expense) {
      setTimeout(function () {
        this.form.value.date = this.expense.date;
        this.form.value.type = this.expense.type;
        this.form.value.odometer = this.expense.odometer;
        this.form.value.paidAmount = this.expense.paidAmount;
        this.form.value.note = this.expense.note;
        this.form.value.id = this.expense.id;
        this.form.setValue(this.form.value);
      }.bind(this), 0);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
