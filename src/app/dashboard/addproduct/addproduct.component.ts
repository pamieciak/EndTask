import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
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
    console.log(e.target);
    if ((e.target as HTMLElement).classList.contains('users')) {
      this.router.navigate(['dashboard/user-list']);
    } else if ((e.target as HTMLElement).classList.contains('adduser')) {
      this.router.navigate(['dashboard/add-user']);
    } else this.router.navigate(['dashboard']);
  }

  // @HostListener('document:click', ['$event']) public hide(e: MouseEvent) {
  //   if (!this.openA || this.el.nativeElement.contains(e.target)) return;
  //   this.openA = false;
  //   // console.log(e.target);
  //   // if ((e.target as HTMLElement).classList.contains('users')) {
  //   //   this.router.navigate(['dashboard/user-list']);
  //   // } else if ((e.target as HTMLElement).classList.contains('adduser')) {
  //   //   this.router.navigate(['dashboard/add-user']);
  //   // } else if ((e.target as HTMLElement).classList.contains('adduser')) {
  //   //   this.router.navigate(['dashboard/add-user']);
  //   // } else this.router.navigate(['dashboard']);
  // }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private el: ElementRef
  ) {}

  addflavour() {
    this.apiService.addFlavour(this.name.value);
  }
  addAmount() {
    this.apiService.addAmount(this.value.value);
  }

  openFlav() {
    this.openF = !this.openF;
    // if (this.openF === false) this.router.navigate(['dashboard']);
  }
  openAmount() {
    this.openA = !this.openA;
  }
}
