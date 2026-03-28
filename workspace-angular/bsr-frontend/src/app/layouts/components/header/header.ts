import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../../core/constants/navigation.constants';
import { CatalogService } from '../../../core/services/catalog.service';
import { AccountMenuComponent } from '../../../shared/components/account-menu/account-menu';
import { IconComponent } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AccountMenuComponent, IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);

  readonly currentUrl = signal(this.router.url);
  readonly isHome = computed(() => this.currentUrl() === '/home');
  readonly navLinks = toSignal(this.catalogService.getNavigationLinks(), {
    initialValue: PRIMARY_NAV_LINKS,
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }
}
