import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Name, Value } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';
import { Favourite } from '../interfaces/favourites.interface';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  addFlavour(name: string) {
    return this.db.list<Name>('/products/flavours').push({ name: name });
  }

  addAmount(value: string) {
    return this.db.list<Value>('/products/amount').push({ value: value });
  }

  getFlavours() {
    return this.db.list<Name>('/products/flavours').valueChanges();
  }

  getAmount() {
    return this.db.list<Value>('/products/amount').valueChanges();
  }

  removeAmount(amount: Value) {
    this.db
      .list('/products/amount/')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((dbAmounts) => {
        let itemToBeDeleted = dbAmounts.find((element) => {
          return (element.payload.val() as Value).value === amount.value
            ? true
            : false;
        });
        console.log(itemToBeDeleted?.key?.valueOf());

        this.db
          .list('/products/amount')
          .remove(itemToBeDeleted?.key?.valueOf());
      });
  }

  removeFlavour(flavour: Name) {
    this.db
      .list('/products/flavours')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((dbFlavour) => {
        let itemToBeDeleted = dbFlavour.find((element) => {
          return (element.payload.val() as Name).name === flavour.name
            ? true
            : false;
        });
        console.log(itemToBeDeleted?.key?.valueOf());

        this.db
          .list('/products/flavours')
          .remove(itemToBeDeleted?.key?.valueOf());
      });
  }

  getOrders() {
    return this.db.list<User>('/users/').valueChanges();
  }

  getOrderData(uid: string) {
    return this.db.list<Order>('users/' + uid + '/orders/').valueChanges();
  }

  getUser() {
    return this.db.list<User>('/users/').valueChanges();
  }

  setUserData(uid: string, user: User) {
    this.db.object('users/' + uid).set(user);
  }

  addToFavourites(uid: string, data: Favourite[]) {
    this.db.object('users/' + uid + '/favs/').set(data);
  }

  getFavs(uid: string) {
    return this.db.object<any>('/users/' + uid + '/favs/').valueChanges();
  }
}
