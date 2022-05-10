import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { favInterface } from 'src/app/shared/services/favinterface';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent {
  fav: favInterface[] = [];
  result: favInterface[] = [];

  

  data1 = localStorage.getItem('user');
  data2 = JSON.parse(this.data1!);
  showflavlist = false;

  showFlav$ = this.apiService.GetFlavours();

  favData$ = this.apiService.getFavs(this.data2.uid).subscribe((result) => {
    this.result = result;
  });

  constructor(private apiService: ApiService) {}

  showList() {
    this.showflavlist = !this.showflavlist;
  }

  addToFav(flav: favInterface) {
    this.fav.push(flav);
    // this.apiService.getFavs(this.data2.uid).subscribe((result) => {
    //   this.result = result;
    // });
    this.apiService.addToFavourites(this.data2.uid, this.fav);

    console.log(this.fav);
    console.log(this.result);
  }
}
