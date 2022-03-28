import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FirstRegisterComponent } from './components/first-register/first-register.component';
import { SecoundRegisterComponent } from './components/secound-register/secound-register.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';
import { CardComponent } from './components/card/card.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { UsersService } from './services/users.service';
import { ProductsService } from './services/products.service';
import { AuthenticationInterceptor } from './interceptors/token';
import { CategoriesService } from './services/categories.service';
import { CartService } from './services/cart.service';
import { CartProductsService } from './services/cart-products.service';
import { OrderComponent } from './components/order/order.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderReceivedDialogComponent } from './components/order-received-dialog/order-received-dialog.component';
import {MatInputModule} from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import {MatNativeDateModule} from '@angular/material/core';
import { AdminComponent } from './components/admin/admin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    LayoutComponent,
    FirstRegisterComponent,
    SecoundRegisterComponent,
    StartComponent,
    LoginComponent,
    ShopComponent,
    CardComponent,
    CartComponent,
    ProductSearchPipe,
    OrderComponent,
    ReceiptComponent,
    ShippingComponent,
    HighlightSearchPipe,
    OrderReceivedDialogComponent,
    AdminComponent,
    EditProductDialogComponent,
    AddProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    NgxMatFileInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UsersService,
    ProductsService,
    CategoriesService,
    CartService,
    CartProductsService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
