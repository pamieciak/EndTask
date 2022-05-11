import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from '../user-dashboard/add-order/add-order.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
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
        component: AddOrderComponent,
      },
    ]


@NgModule({
  declarations: [

  ],
  imports: [

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
