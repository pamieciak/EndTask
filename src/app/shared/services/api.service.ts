import { Injectable } from '@angular/core';
import { Userinterface } from '../userinterface';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { UserInfo } from 'os';
import { BehaviorSubject, Observable } from 'rxjs';
// import { flavourInterface } from './flavourinterface';
import { productinterface, productvalue } from './productinterface';

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

  GetUserwithOrder() {
    return this.db.object<any>('/orders/').valueChanges();
  }

  getData() {
    return this.db.list('/products').valueChanges();
  }

  SetUserData(uid: string, user: Userinterface) {
    this.db.object('users/' + uid).set(user);
  }




  addToFavourites(uid: string, data: favInterface[]) {
    this.db.object('users/' + uid + '/favs/').set(data);
  }

  getFavs(uid: string){
    return this.db.object<any>('/users/' + uid + '/favs/').valueChanges();
  }

  // SetOrderData(uid: any, order: orderData) {
  //   this.db.object('users/' + uid).update(order);
  // }
}
//   SetUserData(uid: string, user: any) {
//     const userRef: AngularFirestoreDocument<any> = this.db.doc(
//       `users/${user.uid}`
//     );
//     const userData: Userinterface = {
//       uid: user.uid,
//       name: user.name,
//       email: user.email,
//       displayName: user.displayName,

//     };
//     return userRef.set(userData, {
//       merge: true,
//     });
//   }
// }
