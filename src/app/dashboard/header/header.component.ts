import {
  Component,
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
  toggle = false;

  @Output() isLogout = new EventEmitter<void>();
  
  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.toggle || this.el.nativeElement.contains(e.target)) return;
    this.toggle = false;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private el: ElementRef
  ) {}

  logOut() {
    this.userService.logOut();
    this.isLogout.emit();
    this.router.navigate(['log-in']);
  }
  toggleNav() {
    this.toggle = !this.toggle;
  }
}
