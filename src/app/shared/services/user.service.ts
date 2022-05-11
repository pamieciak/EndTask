import { VariableBinding } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Userinterface } from '../userinterface';
import { ApiService } from './api.service';
import { apiInterface } from './apiinterface';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { authActions } from 'src/app/store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: string | null;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    public apiService: ApiService,
    public router: Router,
    public store: Store<AppState>
  ) {}

  isLoggedIn = false;

  signin(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user?.email) {
          const userData: apiInterface = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
          };
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user = res.user.displayName;
          this.store.dispatch(authActions.setAuth());
          this.router.navigate(['dashboard']);
        }
      });
  }

  signup(name: string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.apiService.SetUserData(res.user!.uid, {
          name: name,
          email: email,
          displayName: 'customer',
          orders: [],
        });
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
    this.store.dispatch(authActions.setNoAuth());
    localStorage.removeItem('user');
  }
}
