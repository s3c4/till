import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public getUniqueCategories(products: Product[]): string[] {
    const uniqueCategories = new Set<string>();

    for (const product of products) {
      uniqueCategories.add(product.category);
    }

    return Array.from(uniqueCategories);
  }
}
