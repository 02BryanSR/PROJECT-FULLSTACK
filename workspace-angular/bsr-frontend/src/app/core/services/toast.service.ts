import { Injectable, signal } from '@angular/core';

export interface ToastState {
  visible: boolean;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly state = signal<ToastState>({
    visible: false,
    title: '',
    message: '',
  });

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  showError(message: string, duration = 4000): void {
    this.show({
      title: 'Algo salió mal',
      message,
      duration,
    });
  }

  show(toast: { title: string; message: string; duration?: number }): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.state.set({
      visible: true,
      title: toast.title,
      message: toast.message,
    });

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, toast.duration ?? 4000);
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.state.update((current) => ({
      ...current,
      visible: false,
    }));
  }
}
