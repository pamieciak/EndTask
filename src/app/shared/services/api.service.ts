import { Injectable } from '@angular/core';
import { Userinterface } from '../userinterface';
import { AngularFirestore,AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, } from '@angular/fire/compat/database';

import { UserInfo } from 'os';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public users = new BehaviorSubject<Userinterface[]>([]);

  constructor(private db: AngularFireDatabase ) { }

GetUser(){
  return this.db.list<Userinterface>('/users/').valueChanges()

}

  SetUserData(uid: string, user: Userinterface) {
    this.db.object('users/' + uid).set(user);
  }
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
