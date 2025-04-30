import { Injectable } from '@angular/core';
import { Basket } from '../interfaces/basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public count(basket: Basket[]): number {
    let total = 0;

    for (const item of basket) {
      total += item.number;
    }

    return total;
  }
}
