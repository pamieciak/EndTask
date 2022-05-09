import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent {
  order: any = [];

  // private order: BehaviorSubject<any[]> = new BehaviorSubject([]);

  open = false;
  flav$ = this.getProduct.GetFlavours();
  amout$ = this.getProduct.GetAmount();

  orderForm = new FormGroup({
    flavour: new FormControl(''),
    amount: new FormControl(''),
  });

  constructor(
    private getProduct: ApiService,
    private db: AngularFireDatabase
  ) {}

  openOrder() {
    this.open = !this.open;
  }

  addToCart() {
    this.orderForm.get('flavour')?.value,
      this.orderForm.get('amount')?.value,
      this.order.push(this.orderForm.value);
  }

  sendOrder() {
    const data = localStorage.getItem('user');
    const data2 = JSON.parse(data!);
    this.db.object('users/' + data2.uid + '/orders').set(this.order);
  }
}
