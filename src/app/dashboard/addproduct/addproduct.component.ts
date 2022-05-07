import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  open = false;

  name = new FormControl('', [Validators.required]);

  constructor(private apiService: ApiService, private router: Router) {}

  addflavour() {
    this.apiService.addProduct(this.name.value);
  }

  openFlav() {
    this.open = !this.open;
    if(this.open === false)
    this.router.navigate(['dashboard']);
  }
}
