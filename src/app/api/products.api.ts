import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable
import { Product } from '../interfaces/product';

interface GetProductsInterface {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private apiUrl = 'https://dummyjson.com/products'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<GetProductsInterface> {
    return this.http.get<GetProductsInterface>(this.apiUrl + '?limit=50');
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }
}
