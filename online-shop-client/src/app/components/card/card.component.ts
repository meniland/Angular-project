import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductUi } from 'src/app/models/cartProductUi';
import { Product } from 'src/app/models/product';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product;

  cartProduct: CartProductUi;

  amount = 1;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {

  }

  onLessButtonClick(){
    this.amount--;
  }

  onPlusButtonClick(){
    this.amount++;
  }

  onBuyButtonClick(){
    this.cartProduct = {...this.product};
    this.cartProduct.price = this.cartProduct.price * this.amount;
    this.cartProduct.amount = this.amount;

    this.stateService.setProductSubject(this.cartProduct);

    this.amount = 1;
  }
}
