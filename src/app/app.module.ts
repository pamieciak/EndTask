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


import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { StoreModule } from '@ngrx/store';
import { AdduserComponent } from './dashboard/adduser/adduser.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { AddproductComponent } from './dashboard/addproduct/addproduct.component';
import { AddOrderComponent } from './user-dashboard/add-order/add-order.component';
import { FavouritesComponent } from './user-dashboard/favourites/favourites.component';
import { OrderlistComponent } from './dashboard/orderlist/orderlist.component';
import { AppState } from './store/app.state';
import { authReducer } from './store/auth/auth.reducer';
import { MaterialModule } from './shared/material.module';

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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-flav',
        component: AddproductComponent,
      },
      {
        path: 'add-user',
        component: AdduserComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'order-list',
        component: OrderlistComponent,
      },
    ],
  },
  {
    path: 'userdashboard',
    component: UserDashboardComponent,
    children: [
      {
        path: 'add-order',
        component: AddOrderComponent,
      },
      {
        path: 'icecream-list',
        component: FavouritesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DashboardComponent,
    HeaderComponent,
    AdduserComponent,
    UserDashboardComponent,
    UserListComponent,
    AddproductComponent,
    AddOrderComponent,
    FavouritesComponent,
    OrderlistComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot<AppState>({
      auth: authReducer,
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
