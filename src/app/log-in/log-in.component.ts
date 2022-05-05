import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = true;

  isSigneedIn = false;

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('user') !== null) this.isSigneedIn = true;
    else this.isSigneedIn = false;
  }

  onSignin(email: string, password: string) {
    this.userService.signin(email, password);
  }

  hidePassword() {
    this.hide = !this.hide;
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
