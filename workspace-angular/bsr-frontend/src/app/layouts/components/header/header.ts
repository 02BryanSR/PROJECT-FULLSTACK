import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PRIMARY_NAV_LINKS } from '../../../core/constants/navigation.constants';
import { AuthService } from '../../../core/services/auth.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { ShopService } from '../../../core/services/shop.service';
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
  readonly authService = inject(AuthService);
  private readonly catalogService = inject(CatalogService);
  private readonly shopService = inject(ShopService);

  readonly currentUrl = signal(this.router.url);
  readonly isHome = computed(() => this.currentUrl() === '/home');
  readonly cartItemCount = this.shopService.cartItemCount;
  readonly navLinks = toSignal(this.catalogService.getNavigationLinks(), {
    initialValue: PRIMARY_NAV_LINKS,
  });

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));

    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.shopService.loadMyCart().subscribe({
          error: () => this.shopService.resetCart(),
        });
        return;
      }

      this.shopService.resetCart();
    });
  }
}
