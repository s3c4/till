import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  public toggleToast = true;

  public type = '';
  public message = 'test';

  constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    this.toastService.triggerSubject.subscribe({
      next: (data) => {
        this.message = data.message;
        this.type = data.type;
        this.toggleToast = true;

        setTimeout(() => {
          this.toggleToast = false;
        }, data.time);
      },
    });
  }
}
