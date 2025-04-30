import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { mockProducts } from '../../../mock-data/mock-products';
import { BasketStore } from '../../store/basket.store';

const fakeActivatedRoute = {
  snapshot: {},
} as ActivatedRoute;

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let basketStore: BasketStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    basketStore = TestBed.inject(BasketStore);

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProducts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to basket when item exists', () => {
    basketStore.setBasket([
      {
        number: 1,
        product: mockProducts[0],
      },
    ]);
    spyOn(basketStore, 'addBasket').and.callThrough();
    component.addBasket(mockProducts[0]);
    expect(basketStore.addBasket).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should add to basket when is not there', () => {
    spyOn(basketStore, 'addBasket').and.callThrough();
    component.addBasket(mockProducts[0]);
    expect(basketStore.addBasket).toHaveBeenCalledWith(mockProducts[0]);
  });
});
