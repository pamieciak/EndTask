import { Injectable } from '@angular/core';
import { Userinterface } from '../userinterface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Name, Value } from '../interfaces/productinterface';
import { Order } from '../interfaces/orderinterface';
import { Favourite } from '../interfaces/favinterface';

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

  GetFlavours() {
    return this.db.list<Name>('/products/flavours').valueChanges();
  }

  GetAmount() {
    return this.db.list<Value>('/products/amount').valueChanges();
  }

  getOrders() {
    return this.db.list<Order>('/users/').valueChanges();
  }

  getOrderData(uid: string) {
    return this.db.list<Order>('users/' + uid + '/orders/').valueChanges();
  }

  GetUser() {
    return this.db.list<Userinterface>('/users/').valueChanges();
  }

  SetUserData(uid: string, user: Userinterface) {
    this.db.object('users/' + uid).set(user);
  }

  addToFavourites(uid: string, data: Favourite[]) {
    this.db.object('users/' + uid + '/favs/').set(data);
  }

  getFavs(uid: string) {
    return this.db.object<any>('/users/' + uid + '/favs/').valueChanges();
  }
}
