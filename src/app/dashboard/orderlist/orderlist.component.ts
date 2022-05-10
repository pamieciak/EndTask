import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { add, format } from 'date-fns';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderlistComponent {
  todayOrders = false;
  showErr = false;

  resutls: any = [];
  date = format(add(new Date(), { days: 0 }), 'y-MM-dd');

  constructor(
    private apiService: ApiService,
    private db: AngularFireDatabase
  ) {}

  orders$ = this.apiService.getOrders();

  orders2$ = this.apiService
    .getOrders()
    .subscribe((results) => (this.resutls = results));

  showTodayOrdes() {
    console.log(this.resutls);
    if (
      this.resutls[0].orders === undefined ||
      this.resutls[0].orders[0].date !== this.date
    ) {
      this.showErr = !this.showErr;
    } else {
      this.todayOrders = !this.todayOrders;
    }
  }
}


