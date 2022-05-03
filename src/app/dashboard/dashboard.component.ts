import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Output() isLogout = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logOut();
    this.isLogout.emit();
    this.router.navigate(['log-in']);
  }
}
