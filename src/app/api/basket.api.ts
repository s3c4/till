import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Basket } from '../interfaces/basket';

export interface ResponseSimulate {
  status: number;
  message: string;
  data: Basket[];
}

@Injectable({
  providedIn: 'root',
})
export class BasketApi {
  public finishPayment(payload: Basket[]): Observable<ResponseSimulate> {
    const response = of<ResponseSimulate>({
      status: 201,
      message: 'Data successfully processed',
      data: payload,
    });

    return response.pipe(delay(300));
  }
}
