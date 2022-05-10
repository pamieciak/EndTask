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
  public users$ = this.apiService.GetUser();

  constructor(private apiService: ApiService) {}
}
