import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import { ShopComponent } from './components/shop/shop.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: StartComponent},
  {path: "shop", component: ShopComponent},
  {path: "order", component: OrderComponent},
  {path: "admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
