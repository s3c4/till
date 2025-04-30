import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../interfaces/basket';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class BasketStore {
  // Definition
  private basket: Basket[] = [];
  public basketSubject = new BehaviorSubject<Basket[]>([]);
  public setBasket(basket: Basket[]): void {
    this.basket = basket;
    this.basketSubject.next(basket);
  }
  public getBasket(): Basket[] {
    return this.basket;
  }

  // BASKET ACTIONS

  // -->Add: to basket
  public addBasket(product: Product): void {
    const index = this.basket.findIndex((b) => b.product.id === product.id);
    if (index < 0) {
      // Init the new product in basket
      this.setBasket([
        ...this.basket,
        {
          number: 1,
          product: product,
        },
      ]);
    } else {
      // Increment product in the basket
      this.basket[index].number += 1;
      this.setBasket([...this.basket]);
    }
  }

  // -->Increment: product in basket
  public incrementProduct(index: number): void {
    this.basket[index].number += 1;
    this.setBasket([...this.basket]);
  }

  // -->Decrement: product in basket
  public decrementProduct(index: number, number: number): void {
    if (number > 1) {
      // decrement product
      this.basket[index].number -= 1;
    } else {
      // delete product: if is just one in basket
      this.basket.splice(index, 1);
    }
    this.setBasket([...this.basket]);
  }

  // -->Delete: product form basket
  public deleteProduct(index: number): void {
    this.basket.splice(index, 1);
    this.setBasket([...this.basket]);
  }

  // -->Delete: all products
  public deleteProducts(): void {
    this.setBasket([]);
  }
}
