import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BasketService } from './services/basket.service';
import { BasketStore } from './store/basket.store';
import { mockProducts } from '../mock-data/mock-products';

const fakeActivatedRoute = {
  snapshot: {},
} as ActivatedRoute;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let basketService: BasketService;
  let basketStore: BasketStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    basketService = TestBed.inject(BasketService);
    basketStore = TestBed.inject(BasketStore);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'till' title`, () => {
    expect(component.title).toEqual('till');
  });

  it('should set the count of basket', () => {
    basketStore.setBasket([
      {
        number: 3,
        product: mockProducts[0],
      },
    ]);

    component.ngOnInit();

    expect(component.basketNumbers).toEqual(3);
  });
});
