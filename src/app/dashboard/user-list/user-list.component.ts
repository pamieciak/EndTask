import { Component, OnInit, ChangeDetectionStrategy, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  show = false;

  @HostListener('document:click', ['$event']) public hideDrop(e: MouseEvent) {
    if (!this.show || this.el.nativeElement.contains(e.target)) return;
    this.show = false;
    this.router.navigate(['dashboard'])
  }

  constructor(
    private apiService: ApiService,
    private router: Router,
    private el: ElementRef
  ) {}

  public users$ = this.apiService.GetUser();

  showUser() {
    this.show = !this.show;
    if (this.show === false) this.router.navigate(['dashboard']);
  }
}
