import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Userinterface } from '../userinterface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: string | null;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public fireStore: AngularFirestore
  ) {}

  isLoggedIn = false;

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user?.email) {
          const userData: Userinterface = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
          };
          this.isLoggedIn=true;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user = res.user.displayName;

        }
        });
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user?.updateProfile({
          displayName: 'customer',
        });
      });
  }

  // Przechowywanie w bazie danych
  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: Userinterface = {
  //     uid: user.uid,
  //     email: user.email,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  logOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
