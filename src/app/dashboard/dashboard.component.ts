import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { from, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  
}
