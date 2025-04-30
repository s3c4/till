import { Component, OnInit } from '@angular/core';
import { ProductsApi } from '../../api/products.api';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ProductsStore } from '../../store/products.store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public loading = false;
  public error: string | null = null;

  public categories: string[] = [];

  public searchForm = new FormGroup({
    string: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private productsApi: ProductsApi,
    private productsStore: ProductsStore,
    private productsService: ProductsService
  ) {}

  public ngOnInit(): void {
    this.productsStore.productsSubject.subscribe({
      next: (products) => {
        // console.log('products: ', products);
        if (products.length > 0) {
          // -->Set: products
          this.products = products;
          // -->Set: categories
          this.categories = this.productsService.getUniqueCategories(products);
          // -->Init: the form changes
          this.formChanges();
        } else {
          this.getProductsFromApi();
        }
      },
    });
  }

  public getProductsFromApi() {
    this.loading = true;
    this.productsApi.getProducts().subscribe({
      next: (dataProducts) => {
        this.productsStore.setProducts(dataProducts?.products);
      },
      error: (error) => {
        this.error = error.message;
        console.error('Error fetching data:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public formChanges(): void {
    this.searchForm.controls.string.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe({
        next: () => {
          this.filterProducts();
        },
      });

    this.searchForm.controls.category.valueChanges.subscribe({
      next: () => {
        this.filterProducts();
      },
    });
  }

  public filterProducts() {
    let filteredProducts: Product[] = [];
    const categoryValue = this.searchForm.controls.category.value;
    const stringValue = this.searchForm.controls.string.value?.toLowerCase();
    // -->Filter: by category
    if (categoryValue && categoryValue.length > 0) {
      filteredProducts = this.productsStore.products.filter(
        (p) => p.category === categoryValue
      );
    } else {
      // -->Option: All Categories
      filteredProducts = this.productsStore.products;
    }
    // -->Filter: by title or sku (barcode)
    if (stringValue) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(stringValue) ||
          p.sku.toLowerCase().includes(stringValue)
      );
    }
    this.products = filteredProducts;
  }
}
