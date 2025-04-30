import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ActivatedRoute } from '@angular/router';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductsApi } from '../../api/products.api';
import { mockProducts } from '../../../mock-data/mock-products';
import { of } from 'rxjs';
import { BasketStore } from '../../store/basket.store';

const fakeActivatedRoute = {
  snapshot: { params: {} },
} as ActivatedRoute;

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productsApi: ProductsApi;
  let httpMock: HttpTestingController;
  let basketStore: BasketStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    productsApi = TestBed.inject(ProductsApi);
    httpMock = TestBed.inject(HttpTestingController);
    basketStore = TestBed.inject(BasketStore);

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = mockProducts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set product', () => {
    spyOn(productsApi, 'getProduct').and.returnValue(of(mockProducts[0]));

    component.ngOnInit();

    expect(component.product).toEqual(mockProducts[0]);
  });

  it('should add product to basket', () => {
    spyOn(basketStore, 'addBasket');
    component.addBasket(mockProducts[0]);
    expect(basketStore.addBasket).toHaveBeenCalledWith(mockProducts[0]);
  });
});
