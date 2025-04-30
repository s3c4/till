import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterModule } from '@angular/router';
import { BasketStore } from '../../store/basket.store';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) public product!: Product;

  constructor(
    private basketStore: BasketStore,
    private toastService: ToastService
  ) {}

  public addBasket(product: Product): void {
    // Add product in basket
    this.basketStore.addBasket(product);
    // -->Show: toast
    this.toastService.triggerSubject.next({
      type: 'green',
      message: 'Item was successfully added to basket!',
      time: 1500,
    });
  }
}
