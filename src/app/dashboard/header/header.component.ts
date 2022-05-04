import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent  {
  showFiller = false;
 toggleNav = false

  @Output() isLogout = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logOut();
    this.isLogout.emit();
    this.router.navigate(['log-in']);
  }
  togglenav(){
    this.toggleNav = !this.toggleNav
    console.log(this.toggleNav);
  }
}
