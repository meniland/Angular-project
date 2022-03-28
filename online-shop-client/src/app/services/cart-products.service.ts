import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CartProduct } from '../models/cartProduct';
import { CartProductUi } from '../models/cartProductUi';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  cartProduct: CartProduct = {} as CartProduct;

  cartId: number;

  productId: number;

  constructor(private http: HttpClient) { }

  public getCartProductsByCartId(): Observable<CartProductUi[]> {
    return this.http.get<CartProductUi[]>(`http://localhost:8080/cartProducts/${this.cartId}`);
  }

  public addCartProduct(): Observable<CartProduct> {
    return this.http.post<CartProduct>("http://localhost:8080/cartProducts/", this.cartProduct);
  }

  public deleteCartProduct(): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/cartProducts/${this.cartId}/${this.productId}`);
  }

}
