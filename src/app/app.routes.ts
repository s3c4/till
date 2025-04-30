import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./components/product/product.module').then(
        (m) => m.ProductModule
      ),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./components/basket/basket.module').then((m) => m.BasketModule),
  },
  {
    path: 'thank-you',
    loadChildren: () =>
      import('./components/thank-you/thank-you.module').then(
        (m) => m.ThankYouModule
      ),
  },
];
