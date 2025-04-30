import { Component, OnInit } from '@angular/core';
import { BasketStore } from '../../store/basket.store';
import { Basket } from '../../interfaces/basket';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { BasketApi } from '../../api/basket.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  public basket: Basket[] = [];

  constructor(
    private router: Router,
    private basketStore: BasketStore,
    private toastService: ToastService,
    private basketApi: BasketApi
  ) {}

  public ngOnInit(): void {
    this.basketStore.basketSubject.subscribe({
      next: (data) => {
        this.basket = data;
      },
    });
  }

  public decrementProduct(index: number, number: number): void {
    // -->Decrement: product in basket
    this.basketStore.decrementProduct(index, number);
    // -->Show: toast
    this.toastService.triggerSubject.next({
      type: 'red',
      message: 'Item was successfully removed to basket!',
      time: 1500,
    });
  }

  public incrementProduct(index: number): void {
    // -->Increment; product in basket
    this.basketStore.incrementProduct(index);
    // -->Show: toast
    this.toastService.triggerSubject.next({
      type: 'green',
      message: 'Item was successfully added to basket!',
      time: 1500,
    });
  }

  public deleteProduct(index: number): void {
    // -->Delete: from basket
    this.basketStore.deleteProduct(index);
    // -->Show: toast
    this.toastService.triggerSubject.next({
      type: 'red',
      message: 'Item was successfully deleted from basket!',
      time: 1500,
    });
  }

  public finishPayment(): void {
    this.basketApi.finishPayment(this.basket).subscribe({
      next: (res) => {
        console.log('Finish payment response: ', res);
      },
      complete: () => {
        this.router.navigateByUrl('/thank-you');
      },
    });
  }
}
