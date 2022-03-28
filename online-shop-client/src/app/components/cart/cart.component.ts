import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProductUi } from 'src/app/models/cartProductUi';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import jwt_decode from 'jwt-decode';
import { CartProductsService } from 'src/app/services/cart-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private productSendSubscription: Subscription;

  productArray: CartProductUi[] = [];
  cartExist: boolean;
  cartId: number;

  opened: boolean;

  totalPrice = 0;

  constructor(private stateService: StateService, private cartService: CartService, private cartProductsService: CartProductsService) { }


  ngOnInit(): void {
    let cartId = sessionStorage.getItem("cartId");
    if (cartId) {
      cartId = JSON.parse(cartId);
      if (typeof cartId == 'number') {
        this.cartId = cartId;
        this.cartProductsService.cartId = cartId;
        this.cartProductsService.getCartProductsByCartId().subscribe(cartProducts => {
          this.productArray = cartProducts;
          cartProducts.forEach(product => this.totalPrice += product.price)

        }, error => {
          alert(error.error.error);
        })
        this.cartExist = true;
      }
    }


    this.productSendSubscription = this.stateService.productSend().subscribe(product => {
      if (!this.cartExist) {
        this.cartExist = true;
        this.cartService.cartData.userId = JSON.parse(sessionStorage.getItem("userId") || '');

        this.cartService.cartData.creationDate = new Date().toISOString(); // .substring(0, 10)


        const observable = this.cartService.addCart();
        observable.subscribe(response => {
          this.cartId = response.cartId;

          this.productArray.push(product);

          this.totalPrice += product.price;

          this.cartProductsService.cartProduct.cartId = this.cartId;
          this.cartProductsService.cartProduct.amount = product.amount;
          this.cartProductsService.cartProduct.productId = product.id;
          this.cartProductsService.cartProduct.totalPrice = product.price;
          this.cartProductsService.addCartProduct().subscribe(() => {

            sessionStorage.setItem("cartId", JSON.stringify(response.cartId));
          }, error => {
            alert(error.error.error);
          })
        }, error => {
          alert(error.error.error);
        })
      }
      if (!this.productArray.some(currentProduct => currentProduct.productname == product.productname) && this.cartId) {
        this.productArray.push(product);
        this.totalPrice += product.price;

        this.cartProductsService.cartProduct.cartId = this.cartId;
        this.cartProductsService.cartProduct.amount = product.amount;
        this.cartProductsService.cartProduct.productId = product.id;
        this.cartProductsService.cartProduct.totalPrice = product.price;
        this.cartProductsService.addCartProduct().subscribe(() => {

        }, error => {
          alert(error.error.error);
        })
      } else if (this.cartId) {
        alert("this product is already in the cart");
      }
    })

  }

  onDeleteButtonClick(productId: number) {

    let currentProduct = this.productArray.find(product => product.id == productId);

    if (currentProduct) {
      this.totalPrice -= currentProduct?.price;
    }

    let indexToDelete = this.productArray.findIndex(product => product.id == productId)
    this.productArray.splice(indexToDelete, 1);

    this.cartProductsService.cartId = this.cartId;
    this.cartProductsService.productId = productId;
    this.cartProductsService.deleteCartProduct().subscribe(() => {
    }, error => {
      alert(error.error.error);
    })
  }

  onDeleteCartClick() {
    this.productArray = [];
    this.totalPrice = 0;
    this.cartExist = false;
    this.cartService.cartId = this.cartId;
    this.cartService.deleteCart().subscribe(() => {
    }, error => {
      alert(error.error.error);
    })

    this.cartProductsService.cartId = this.cartId;
    this.cartProductsService.productId = 0;
    this.cartProductsService.deleteCartProduct().subscribe(() => {
    }, error => {
      alert(error.error.error);
    })
    this.cartId = NaN;
  }

  onOrderClick() {
    this.stateService.productArray = this.productArray;
    this.stateService.totalPrice = this.totalPrice;
  }

  ngOnDestroy(): void {
    this.productSendSubscription.unsubscribe();
  }
}
