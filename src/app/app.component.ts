import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketStore } from './store/basket.store';
import { BasketService } from './services/basket.service';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'till';

  public basketNumbers = 0;

  constructor(
    private basketStore: BasketStore,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.basketStore.basketSubject.subscribe({
      next: (data) => {
        this.basketNumbers = this.basketService.count(data);
      },
    });
  }
}
