import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  categoryId = 0;

  product: Product = {} as Product;

  formData: any;

  constructor(private http: HttpClient) { }

  public getProductsById(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/products/${this.categoryId}`);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/products/`);
  }

  public updateProduct(): Observable<Product[]> {
    return this.http.put<Product[]>(`http://localhost:8080/products/`,this.product);
  }

  public addProduct(): Observable<Product[]> {
    return this.http.post<Product[]>(`http://localhost:8080/products/`,this.product);
  }

  public sendImageFileToServer(): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/files/`, this.formData);
  }

}
