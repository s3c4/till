import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';
import { BasketStore } from '../../store/basket.store';
import { mockProducts } from '../../../mock-data/mock-products';
import { ActivatedRoute } from '@angular/router';

const fakeActivatedRoute = {
  snapshot: {},
} as ActivatedRoute;

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;
  let basketStore: BasketStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    basketStore = TestBed.inject(BasketStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the basket and delete products from basket after 1 second', (done) => {
    // Arrange
    basketStore.setBasket([
      {
        number: 2,
        product: mockProducts[0],
      },
      {
        number: 3,
        product: mockProducts[1],
      },
    ]);
    spyOn(basketStore, 'deleteProducts').and.callThrough();

    // Act
    component.ngOnInit();

    expect(component.basket).toBe(basketStore.getBasket());

    // Use a setTimeout to wait for the async operation
    setTimeout(() => {
      expect(basketStore.deleteProducts).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
