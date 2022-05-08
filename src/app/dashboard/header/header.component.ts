import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // showFiller = false;
  toggleNav = false;

  @Output() isLogout = new EventEmitter<void>();
  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.toggleNav || this.el.nativeElement.contains(e.target)) return;
    this.toggleNav = false;
  }

  constructor(private userService: UserService, private router: Router, private el: ElementRef) {}

  logout() {
    this.userService.logOut();
    this.isLogout.emit();
    this.router.navigate(['log-in']);
  }
  togglenav() {
    this.toggleNav = !this.toggleNav;
  }
}
