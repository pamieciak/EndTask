import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  show = false;
  showOrd = false;
  openOrd = false;

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.show || this.el.nativeElement.contains(e.target)) return;
    this.show = false;
    if ((e.target as HTMLElement).classList.contains('adduser')) {
      this.router.navigate(['dashboard/add-user']);
    } else if ((e.target as HTMLElement).classList.contains('addFlav')) {
      this.router.navigate(['dashboard/add-flav']);
    } else this.router.navigate(['dashboard']);
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private el: ElementRef
  ) {}

  public users$ = this.apiService.getUser();

  showUser() {
    this.show = !this.show;
    if (this.show === false) this.router.navigate(['dashboard']);
  }

  showorder() {
    this.showOrd = !this.showOrd;
  }

  openOrders() {
    this.openOrd = !this.openOrd;
  }
}
