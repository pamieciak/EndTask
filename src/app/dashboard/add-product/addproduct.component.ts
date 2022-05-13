import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './add-product.component.html',
  styleUrls: ['./addproduct.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddproductComponent {
  openF = false;
  openA = false;

  name = new FormControl('', [Validators.required]);
  value = new FormControl('', [Validators.required]);

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {

    if (!this.openF || this.el.nativeElement.contains(e.target)) return;
    this.openF = false;

    if ((e.target as HTMLElement).classList.contains('users')) {
      this.router.navigate(['dashboard/user-list']);

    } else if ((e.target as HTMLElement).classList.contains('adduser')) {
      this.router.navigate(['dashboard/add-user']);

    } else this.router.navigate(['dashboard']);
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  addFlavour() {
    this.apiService.addFlavour(this.name.value);

    setTimeout(() => {
      this.openF = !this.openF;
      this.router.navigate(['dashboard']);
      this.cdr.detectChanges();
    }, 1000);
  }

  addAmount() {
    this.apiService.addAmount(this.value.value);

    setTimeout(() => {
      this.openA = !this.openA;
      this.router.navigate(['dashboard']);
      this.cdr.detectChanges();
    }, 1000);
  }

  openFlav() {
    this.openF = !this.openF;
  }
  openAmount() {
    this.openA = !this.openA;
  }
}
