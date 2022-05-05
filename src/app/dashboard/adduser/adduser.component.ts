import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
  constructor(public userService: UserService, public fireStore: AngularFirestore) {}

  async onSignup(email: string, password: string) {
    await this.userService.signup(email, password)
    };
  }

