import { Injectable } from '@angular/core';
import { Userinterface } from '../userinterface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  productData,
  productinterface,
  productvalue,
} from './productinterface';
import { orderData } from './orderinterface';
import { favInterface } from './favinterface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  addFlavour(name: string) {
    return this.db
      .list<productinterface>('/products/flavours')
      .push({ name: name });
  }

  addAmount(value: string) {
    return this.db
      .list<productvalue>('/products/amount')
      .push({ value: value });
  }

  GetFlavours() {
    return this.db.list<productinterface>('/products/flavours').valueChanges();
  }

  GetAmount() {
    return this.db.list<productvalue>('/products/amount').valueChanges();
  }

  getOrders() {
    return this.db.list<any>('/users/').valueChanges();
  }

  getOrderData(uid: string) {
    return this.db.list<orderData>('users/' + uid + '/orders/').valueChanges();
  }

  GetUser() {
    return this.db.list<Userinterface>('/users/').valueChanges();
  }

  SetUserData(uid: string, user: Userinterface) {
    this.db.object('users/' + uid).set(user);
  }

  addToFavourites(uid: string, data: favInterface[]) {
    this.db.object('users/' + uid + '/favs/').set(data);
  }

  getFavs(uid: string) {
    return this.db.object<any>('/users/' + uid + '/favs/').valueChanges();
  }
}
