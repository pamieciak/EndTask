import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdduserComponent {
  add = false;

  SignUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true;

  constructor(
    public userService: UserService,
    public fireStore: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {}

  onSignup(name: string, email: string, password: string) {
    this.userService.signup(name, email, password);
    setTimeout(() => {
      this.add = !this.add;
      this.cdr.detectChanges();
    },1000);
  }

  addUser() {
    this.add = !this.add;
  }

  hidePassword() {
    this.hide = !this.hide;
  }

  get name() {
    return this.SignUpForm.get('name');
  }
  get email() {
    return this.SignUpForm.get('email');
  }
  get password() {
    return this.SignUpForm.get('password');
  }
}
