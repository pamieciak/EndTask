import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { favInterface } from 'src/app/shared/services/favinterface';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  showflavlist = false;
  fav: favInterface[] = [];
  result: favInterface[] = [];

  data1 = localStorage.getItem('user');
  data2 = JSON.parse(this.data1!);

  showFlav$ = this.apiService.GetFlavours();

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.showflavlist || this.el.nativeElement.contains(e.target)) return;
    this.showflavlist = false;
    this.router.navigate(['userdashboard']);
  }

  constructor(
    private apiService: ApiService,
    private el: ElementRef,
    private router: Router
  ) {}

  showList() {
    this.showflavlist = !this.showflavlist;
  }

  addToFav(flav: favInterface) {
    this.fav.push(flav);

    this.apiService.addToFavourites(this.data2.uid, this.fav);

    console.log(this.fav);
    console.log(this.result);
  }
}
