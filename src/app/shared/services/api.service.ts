import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Flavour, Value } from '../interfaces/product.interface';
import { Order } from '../interfaces/order.interface';
import { Favourite } from '../interfaces/favourites.interface';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  addFlavour(name: string) {
    this.db
      .list('/products/flavours')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((dbAmounts) => {
        let itemToCompare = dbAmounts.filter((element) => {
          if ((element.payload.val() as Flavour).name === name) {
            return true;
          } else {
            return false;
          }
        });
        if (itemToCompare.length > 0) {
          alert('smak juz istnieje');
        } else {
          this.db.list<Flavour>('/products/flavours').push({ name: name });
          alert('smak dodany');
        }
      });
  }

  addAmount(value: string) {
    this.db
      .list('/products/amount')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((dbAmounts) => {
        let amoutToCompare = dbAmounts.filter((element) => {
          if ((element.payload.val() as Value).value === value) {
            return true;
          } else {
            return false;
          }
        });
        if (amoutToCompare.length > 0) {
          alert('wartość juz istnieje');
        } else {
          this.db.list<Value>('/products/amount').push({ value: value });
          alert('wartość dodany');
        }
      });
  }

  getFlavours() {
    return this.db.list<Flavour>('/products/flavours').valueChanges();
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

        this.db
          .list('/products/amount')
          .remove(itemToBeDeleted?.key?.valueOf());
      });
  }

  removeFlavour(flavour: Flavour) {
    this.db
      .list('/products/flavours')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((dbFlavour) => {
        let itemToBeDeleted = dbFlavour.find((element) => {
          return (element.payload.val() as Flavour).name === flavour.name
            ? true
            : false;
        });

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
