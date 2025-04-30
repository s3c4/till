import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public triggerSubject = new BehaviorSubject<Toast>({
    type: '',
    message: '',
    time: 0,
  } as Toast);
}
