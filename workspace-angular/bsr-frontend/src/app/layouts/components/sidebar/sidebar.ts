import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon';
import { UserDropdown } from '../../../shared/components/user-dropdown/user-dropdown';

@Component({
  selector: 'app-sidebar',
  imports: [IconComponent, RouterLink, UserDropdown],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly router = inject(Router);

  readonly isOpen = signal(false);
  readonly navLinks = [
    { label: 'HOME', route: '/home' },
    { label: 'MUJER', route: '/mujer' },
    { label: 'HOMBRE', route: '/hombre' },
    { label: 'NIÑOS', route: '/ninos' },
    { label: 'ACCESORIOS', route: '/accesorios' },
  ];

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.close());
  }

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
