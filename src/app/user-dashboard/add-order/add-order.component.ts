import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { format } from 'date-fns';
import { orderData } from 'src/app/shared/services/orderinterface';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent {
  order: any = [];
  date = format(new Date(), 'y-MM-dd');

  data1 = localStorage.getItem('user');
  data2 = JSON.parse(this.data1!);

  // private order: BehaviorSubject<any[]> = new BehaviorSubject([]);

  open = false;
  flav$ = this.getProduct.GetFlavours();
  amout$ = this.getProduct.GetAmount();

  orderForm = new FormGroup({
    flavour: new FormControl(''),
    amount: new FormControl(''),
    date: new FormControl(this.date),
  });

  constructor(
    private getProduct: ApiService,
    private db: AngularFireDatabase
  ) {}

  openOrder() {
    this.open = !this.open;
  }

  // const data = localStorage.getItem('user');
  // const data2 = JSON.parse(data!);

  // const exist = this.db.database.ref('users/' + data2.uid + '/orders/');
  // exist.once('value', (snapshot) => {
  //   if (snapshot.exists()) {
  //     alert('zamówienie zostało już dzisiaj złożone');
  //     this.open = false;
  //   } else {
  //     this.open = true;
  //   }
  // });

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
  }

  // getDate() {
  //   const data = localStorage.getItem('user');
  //   const data2 = JSON.parse(data!);
  //   const userdata = this.db.object('users/' + data2.uid + '/orders/');

  //   console.log(userdata);
  // }
}
