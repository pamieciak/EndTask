import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { Favourite } from 'src/app/shared/interfaces/favourites.interface';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  showFlavList = false;
  fav: Favourite[] = [];
  result: Favourite[] = [];

  data1 = localStorage.getItem('user');
  data2 = JSON.parse(this.data1!);

  showFlav$ = this.apiService.getFlavours();

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.showFlavList || this.el.nativeElement.contains(e.target)) return;

    this.showFlavList = false;
    this.router.navigate(['userdashboard']);
  }

  constructor(
    private apiService: ApiService,
    private el: ElementRef,
    private router: Router
  ) {}

  showList() {
    this.showFlavList = !this.showFlavList;
  }

  addToFav(flav: Favourite) {
    this.fav.push(flav);
    this.apiService.addToFavourites(this.data2.uid, this.fav);
  }
}
