import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartProductUi } from '../models/cartProductUi';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  productArray: CartProductUi[] = [];

  totalPrice: number;

  private productSubject: Subject<CartProductUi> = new Subject<CartProductUi>();

  setProductSubject(product: CartProductUi){
    this.productSubject.next(product);
  }

  productSend(): Observable<CartProductUi>{
    return this.productSubject.asObservable();
  }

  private isUserLoggedInSubject: Subject<boolean> = new Subject<boolean>();

  setIsUserLoggedInSubject(value: boolean){
    this.isUserLoggedInSubject.next(value);
  }

  isUserLoginObservable(): Observable<boolean>{
    return this.isUserLoggedInSubject.asObservable();
  }
  constructor() { }
}
