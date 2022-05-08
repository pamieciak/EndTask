import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  
    public flav$ = this.apiService.GetFlavours();
    public amount$ = this.apiService.GetAmount();
   

  constructor(private apiService: ApiService) {}

  // getData(){
  //   return forkJoin([this.flav$, this.amount$]).subscribe((res) => {
  //     console.log(res);
  //   })
  // }

  
}
