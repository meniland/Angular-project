import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartData } from '../models/cartData';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartData: CartData = {} as CartData;
  cartId: number;
  userId: number;
  constructor(private http: HttpClient) { }

  public addCart(): Observable<CartData> {
    return this.http.post<CartData>("http://localhost:8080/carts/", this.cartData);
  }

  public deleteCart(): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/carts/${this.cartId}`);
  }

  public getCartIdByUserId(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/carts/${this.userId}`);
  }
}
