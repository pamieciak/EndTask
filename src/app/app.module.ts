import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';


import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { StoreModule } from '@ngrx/store';
import { AdduserComponent } from './dashboard/adduser/adduser.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path:'dashboard',
    component:DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path:'userdashboard',
    component: UserDashboardComponent
  }
];

@NgModule({
  declarations: [AppComponent, LogInComponent, DashboardComponent, HeaderComponent, AdduserComponent, UserDashboardComponent, UserListComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({},{}),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
