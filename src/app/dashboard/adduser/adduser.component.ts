import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdduserComponent {
  add = false;
  hide = true;

  SignUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.add || this.el.nativeElement.contains(e.target)) return;
    this.add = false;
    console.log(e.target);
    if ((e.target as HTMLElement).classList.contains('users')) {
      this.router.navigate(['dashboard/user-list']);
    } else if ((e.target as HTMLElement).classList.contains('addFlav')) {
      this.router.navigate(['dashboard/add-flav']);
    } else this.router.navigate(['dashboard']);
  }

  constructor(
    public userService: UserService,
    public fireStore: AngularFirestore,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private el: ElementRef
  ) {}

  onSignup(name: string, email: string, password: string) {
    this.userService.signup(name, email, password);
    setTimeout(() => {
      this.add = !this.add;
      this.router.navigate(['dashboard']);
      this.cdr.detectChanges();
    }, 1000);
  }

  addUser() {
    this.add = !this.add;
    if (this.add === false) this.router.navigate(['dashboard']);
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
