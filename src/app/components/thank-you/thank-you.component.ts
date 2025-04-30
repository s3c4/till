import { Component, OnInit } from '@angular/core';
import { BasketStore } from '../../store/basket.store';
import { Basket } from '../../interfaces/basket';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  public basket: Basket[] = [];

  constructor(private basketStore: BasketStore) {}

  public ngOnInit(): void {
    this.basket = this.basketStore.getBasket();
    setTimeout(() => {
      this.basketStore.deleteProducts();
    }, 1000);
  }
}
