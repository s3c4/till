import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsApi } from '../../api/products.api';
import { Product } from '../../interfaces/product';
import { BasketStore } from '../../store/basket.store';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product',
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  public product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productsApi: ProductsApi,
    private basketStore: BasketStore,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.productsApi.getProduct(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.product = data;
      },
    });
  }

  public addBasket(product: Product): void {
    if (product) {
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
}
