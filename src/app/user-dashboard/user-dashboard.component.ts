import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { format } from 'date-fns';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent {
  showflavlist = false;
  data = localStorage.getItem('user');
  data2 = JSON.parse(this.data!);
  date = format(new Date(), 'y-MM-dd');

  constructor(
    private apiService: ApiService,
    private db: AngularFireDatabase
  ) {}

  result = {};

  showList() {
    this.showflavlist = !this.showflavlist;
  }

  showFlav$ = this.apiService.GetFlavours();

  // showOrder$ = this.apiService
  //   .getUserOrder(this.data2.uid)
  //   .subscribe((value) => (this.result = value));



    addtofav(name: string) {
    this.apiService.addToFavourites(this.data2.uid, name)
  }

  // public user$ = this.apiService
  //   .GetUserwithOrder(this.data2.uid, this.date)
  //   .subscribe((value) => (this.result = value));
}
