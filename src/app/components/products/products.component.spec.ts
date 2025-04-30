import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockProducts } from '../../../mock-data/mock-products';
import { ProductsStore } from '../../store/products.store';
import { ProductsApi } from '../../api/products.api';
import { of, throwError } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productStore: ProductsStore;
  let productsApi: ProductsApi;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productStore = TestBed.inject(ProductsStore);
    productsApi = TestBed.inject(ProductsApi);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set products from store', () => {
    productStore.setProducts(mockProducts);

    component.ngOnInit();

    expect(component.products).toEqual(productStore.products);
  });

  it('should set products from store', () => {
    spyOn(productsApi, 'getProducts').and.returnValue(
      of({
        limit: 50,
        products: mockProducts,
        skip: 0,
        total: 194,
      })
    );

    component.getProductsFromApi();

    expect(productStore.products).toEqual(mockProducts);
  });

  it('should set component.error', () => {
    const errorMessage = 'this is an error message';

    spyOn(productsApi, 'getProducts').and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    component.getProductsFromApi();

    expect(component.error).toEqual(errorMessage);
  });

  it('should get all products by empty category', () => {
    productStore.setProducts(mockProducts);
    component.formChanges();
    component.searchForm.controls.category.setValue('');
    expect(component.products).toEqual(productStore.products);
  });

  it('should filter products by category beauty', () => {
    productStore.setProducts(mockProducts);

    component.formChanges();
    component.searchForm.controls.category.setValue('beauty');
    expect(component.products.length).toBeLessThan(
      productStore.products.length
    );
  });

  it('should get all products by string', (done) => {
    productStore.setProducts(mockProducts);

    component.formChanges();

    component.searchForm.controls.string.setValue('Princess');
    setTimeout(() => {
      expect(component.products.length).toBeLessThan(
        productStore.products.length
      );
      done();
    }, 400);
  });
});
