import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../../core/constants/navigation.constants';
import { AccountMenuComponent } from '../../../shared/components/account-menu/account-menu';
import { IconComponent } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AccountMenuComponent, IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly router = inject(Router);

  readonly isOpen = signal(false);
  readonly navLinks = PRIMARY_NAV_LINKS;

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
