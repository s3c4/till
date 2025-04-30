import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsStore {
  //Definition
  public products: Product[] = [];
  public productsSubject = new BehaviorSubject<Product[]>([]);
  public setProducts(products: Product[]): void {
    this.products = products;
    this.productsSubject.next(products);
  }
}
