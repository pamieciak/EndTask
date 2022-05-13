import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  showProduct = false;

  productsAmount$ = this.apiService.getAmount();
  productsFlavour$ = this.apiService.getFlavours();

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.showProduct || this.el.nativeElement.contains(e.target)) return;
    this.showProduct = false;

    if ((e.target as HTMLElement).classList.contains('users')) {
      this.router.navigate(['dashboard/user-list']);
    } else if ((e.target as HTMLElement).classList.contains('adduser')) {
      this.router.navigate(['dashboard/add-user']);
    } else this.router.navigate(['dashboard']);
  }

  constructor(
    private apiService: ApiService,
    private el: ElementRef,
    private router: Router
  ) {}

  removeAmount(amount: { value: string }) {
    this.apiService.removeAmount(amount);
  }
  removeFlavour(flavour: { name: string }) {
    this.apiService.removeFlavour(flavour);
  }

  showPorducts() {
    this.showProduct = !this.showProduct;
  }
}
