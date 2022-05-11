import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { format } from 'date-fns';
import { ApiService } from '../shared/services/api.service';
import { favInterface } from '../shared/services/favinterface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent {
  constructor() {}
}
