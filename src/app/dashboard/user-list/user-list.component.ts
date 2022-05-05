import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {

  show = false;

  constructor(private apiService: ApiService) {}

  public users$ = this.apiService.GetUser();

  showUser(){
    this.show = !this.show
  }
}
