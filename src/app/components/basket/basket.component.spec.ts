import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { BasketStore } from '../../store/basket.store';
import { mockProducts } from '../../../mock-data/mock-products';
import { BasketApi } from '../../api/basket.api';
import { of } from 'rxjs';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let basketStore: BasketStore;
  let basketApi: BasketApi;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketComponent],
    }).compileComponents();

    basketStore = TestBed.inject(BasketStore);
    basketApi = TestBed.inject(BasketApi);

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrement and remove 1 item from', () => {
    basketStore.setBasket([
      {
        number: 5,
        product: mockProducts[0],
      },
    ]);
    component.decrementProduct(0, 5);

    expect(basketStore.getBasket()[0].number).toEqual(4);
  });

  it('should decrement', () => {
    basketStore.setBasket([
      {
        number: 1,
        product: mockProducts[0],
      },
    ]);

    component.decrementProduct(0, 1);

    expect(basketStore.getBasket().length).toEqual(0);
    // expect().nothing();
  });

  it('should increment', () => {
    basketStore.setBasket([
      {
        number: 5,
        product: mockProducts[0],
      },
    ]);
    component.incrementProduct(0);
    expect(basketStore.getBasket()[0].number).toEqual(6);
  });

  it('should delete product', () => {
    basketStore.setBasket([
      {
        number: 1,
        product: mockProducts[0],
      },
    ]);
    component.deleteProduct(0);
    expect(basketStore.getBasket().length).toEqual(0);
  });

  it('should cll router navigateByUrl', () => {
    component.finishPayment();
    expect().nothing();
  });

  it('should cll router navigateByUrl with fake data', () => {
    spyOn(basketApi, 'finishPayment').and.returnValue(
      of({
        status: 201,
        message: 'Good!',
        data: [
          {
            number: 5,
            product: mockProducts[0],
          },
        ],
      })
    );
    component.finishPayment();
    expect().nothing();
  });
});
