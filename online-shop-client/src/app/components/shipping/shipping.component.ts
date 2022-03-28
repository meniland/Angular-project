import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import { ReceiptComponent } from '../receipt/receipt.component';
import jwt_decode from 'jwt-decode';
import { UserRegisterDetails } from 'src/app/models/userRegisterDetails';

import { OrderReceivedDialogComponent } from '../order-received-dialog/order-received-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  userDetails: UserRegisterDetails = {} as UserRegisterDetails;
  city: string;
  street: string;
  shippingDate: string;
  creditNumber: number;

  shippingFormGroup: FormGroup | any;
  cityFormControl: FormControl = new FormControl;
  streetFormControl: FormControl = new FormControl;
  dateFormControl: FormControl = new FormControl;
  creditNumberFormControl: FormControl = new FormControl;

  constructor(private ordersService: OrdersService, private stateService: StateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if (token) {

      let decoded: UserRegisterDetails = jwt_decode(token);
      this.userDetails = decoded;
    }

    this.cityFormControl = new FormControl("", [Validators.required]);
    this.streetFormControl = new FormControl("", Validators.required);
    this.dateFormControl = new FormControl("", Validators.required);
    this.creditNumberFormControl = new FormControl("", Validators.required);

    this.shippingFormGroup = new FormGroup({
      city: this.cityFormControl,
      street: this.streetFormControl,
      date: this.dateFormControl,
      creditNumber: this.creditNumberFormControl
    })
  }

  onDateSelected(date: any) {
    this.shippingDate = date;
  }

  onCityInputDblClicked() {
    // this.cityFormControl.value = this.userDetails.city;
  }

  onStreetInputDblClicked(){
    this.street = this.userDetails.street;
  }

  onOrderClick() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let date = `${day}/${month}/${year}`;

    this.ordersService.orderDetails.city = this.cityFormControl.value;
    this.ordersService.orderDetails.street = this.streetFormControl.value;
    this.ordersService.orderDetails.shippingDate = this.dateFormControl.value;
    this.ordersService.orderDetails.creditNumber = this.creditNumberFormControl.value;
    this.ordersService.orderDetails.totalPrice = this.stateService.totalPrice;
    this.ordersService.orderDetails.orderDate = date;
    this.ordersService.orderDetails.cartId = JSON.parse(sessionStorage.getItem("cartId") || "");
    this.ordersService.orderDetails.userId = JSON.parse(sessionStorage.getItem("userId") || "");

    this.ordersService.addOrder().subscribe(() => {
      const dialogRef = this.dialog.open(OrderReceivedDialogComponent, {
        width: '400px',
      });
    }, error => {
      alert(error.error.error)
    })
  }

}



