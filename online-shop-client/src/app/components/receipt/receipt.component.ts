import { Component, OnInit } from '@angular/core';
import { CartProductUi } from 'src/app/models/cartProductUi';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})


export class ReceiptComponent implements OnInit {

  productArray: CartProductUi[] = [];
  searchValue: string;
  totalPrice: number;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.productArray = this.stateService.productArray;
    this.totalPrice = this.stateService.totalPrice;
  }

 
}
