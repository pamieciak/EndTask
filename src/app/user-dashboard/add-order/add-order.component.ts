import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { add, format } from 'date-fns';
import { orderData } from 'src/app/shared/services/orderinterface';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent {
  result: orderData[] = [];
  order: orderData[] = [];
  open = false;
  openMessage = false;

  date = format(add(new Date(), { days: 0 }), 'y-MM-dd');

  data1 = localStorage.getItem('user');
  data2 = JSON.parse(this.data1!);

  orderForm = new FormGroup({
    flavour: new FormControl(''),
    amount: new FormControl(''),
    date: new FormControl(this.date),
  });

  flav$ = this.getProduct.GetFlavours();
  amout$ = this.getProduct.GetAmount();

  orderData$ = this.getProduct
    .getOrderData(this.data2.uid)
    .subscribe((result) => {
      this.result = result;
    });

  constructor(
    private getProduct: ApiService,
    private db: AngularFireDatabase
  ) {}

  openOrder() {
    if (this.result[0] === undefined || this.result[0].date !== this.date) {
      this.open = !this.open;
    } else {
      this.open = false;
      this.openMessage = !this.openMessage;
    }
  }

  addToCart() {
    this.orderForm.get('flavour')?.value,
      this.orderForm.get('amount')?.value,
      this.order.push(this.orderForm.value);
  }

  sendOrder() {
    const data = localStorage.getItem('user');
    const data2 = JSON.parse(data!);
    console.log(data2);
    this.db.object('/users/' + data2.uid + '/orders/').set(this.order);

    this.open = false;
  }

  // getDate() {
  //   const data = localStorage.getItem('user');
  //   const data2 = JSON.parse(data!);
  //   const userdata = this.db.object('users/' + data2.uid + '/orders/');

  //   console.log(userdata);
  // }
}
