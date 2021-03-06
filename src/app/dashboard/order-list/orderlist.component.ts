import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { add, format } from 'date-fns';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-orderlist',
  templateUrl: './order-list.component.html',
  styleUrls: ['./orderlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderlistComponent {
  todayOrders = false;
  results: User[] = [];

  date = format(add(new Date(), { days: 0 }), 'y-MM-dd');

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.todayOrders || this.el.nativeElement.contains(e.target)) return;
    this.todayOrders = false;

    if ((e.target as HTMLElement).classList.contains('adduser')) {
      this.router.navigate(['dashboard/add-user']);
    } else if ((e.target as HTMLElement).classList.contains('addFlav')) {
      this.router.navigate(['dashboard/add-flav']);
    } else if ((e.target as HTMLElement).classList.contains('users')) {
      this.router.navigate(['dashboard/user-list']);
    } else this.router.navigate(['dashboard']);
  }

  constructor(
    private apiService: ApiService,
    private db: AngularFireDatabase,
    private el: ElementRef,
    private router: Router
  ) {}

  orders$ = this.apiService.getOrders();

  showTodayOrdes() {
    this.todayOrders = !this.todayOrders;

    if (this.todayOrders === false) this.router.navigate(['dashboard']);
  }
}
