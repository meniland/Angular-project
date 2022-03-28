import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '../models/order';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orderDetails: Order = {} as Order;



  constructor(private http: HttpClient) { }

  public addOrder(): Observable<Order> {
    return this.http.post<Order>("http://localhost:8080/orders/", this.orderDetails);
  }
}
