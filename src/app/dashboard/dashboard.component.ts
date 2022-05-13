import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  showPr = false;

  productsAmount$ = this.apiService.GetAmount();
  productsFlavour$ = this.apiService.GetFlavours();

  constructor(private apiService: ApiService) {}

  showPorducts() {
    this.showPr = !this.showPr;
  }
}
