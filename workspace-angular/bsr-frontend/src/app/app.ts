import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './layouts/components/header/header';
import { Sidebar } from './layouts/components/sidebar/sidebar';
import { ToastComponent } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Sidebar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly title = signal('bsr-frontend');
  private readonly hiddenHeaderRoutes = new Set(['/login', '/register', '/forgot-password']);
  readonly currentUrl = signal(this.router.url);
  readonly showHeader = computed(() => !this.hiddenHeaderRoutes.has(this.currentUrl()));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }
}
