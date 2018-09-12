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
  createSuccessString: any;

  constructor(public navCtrl: NavController, 
    navParams: NavParams, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public api: Api, 
    public translateService: TranslateService
  ) {
    this.expense = navParams.get('expense');
    
    this.form = formBuilder.group({
      date: this.expense ? this.expense.date : new Date().toISOString(),
      type: this.expense ? this.expense.type : undefined,
      odometer: this.expense ? this.expense.odometer : undefined,
      paid: this.expense ? this.expense.paid : undefined,
      note: this.expense ? this.expense.note : undefined,
      id: this.expense ? this.expense.id : undefined
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    this.translateService.get('EXPENSE_CREATE_SUCCESS').subscribe((value) => {
      this.createSuccessString = value;
    })
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
