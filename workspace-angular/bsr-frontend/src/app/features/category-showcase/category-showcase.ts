import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { type CatalogProduct } from '../../core/interfaces/catalog.interface';
import { AuthService } from '../../core/services/auth.service';
import { ShopService } from '../../core/services/shop.service';
import {
  CatalogProductCardComponent,
  CatalogProductCardVariant,
} from '../../shared/components/catalog-product-card/catalog-product-card';
import { ToastService } from '../../core/services/toast.service';

export interface CategoryShowcasePanel {
  eyebrow: string;
  title: string;
  description: string;
}

export interface CategoryShowcaseImage {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-category-showcase',
  standalone: true,
  imports: [RouterLink, CatalogProductCardComponent],
  templateUrl: './category-showcase.html',
})
export class CategoryShowcaseComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly shopService = inject(ShopService);
  private readonly toastService = inject(ToastService);

  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly accent = input.required<string>();
  readonly heroImage = input.required<string>();
  readonly heroAlt = input.required<string>();
  readonly highlights = input.required<readonly string[]>();
  readonly panels = input.required<readonly CategoryShowcasePanel[]>();
  readonly gallery = input.required<readonly CategoryShowcaseImage[]>();
  readonly products = input.required<readonly CatalogProduct[]>();
  readonly addingProductId = signal<number | null>(null);

  readonly responsiveGallery = computed(() => {
    const heroSrc = this.heroImage().trim();
    const seen = new Set(heroSrc ? [heroSrc] : []);

    return this.gallery().filter((image) => {
      const imageSrc = image.src?.trim();

      if (!imageSrc || seen.has(imageSrc)) {
        return false;
      }

      seen.add(imageSrc);

      return true;
    });
  });

  readonly productCards = computed(() =>
    this.products().map((product, index, products) => ({
      product,
      variant: this.getProductCardVariant(index, products.length),
    })),
  );

  addToCart(product: CatalogProduct): void {
    if ((product.stock ?? 0) <= 0) {
      this.toastService.showError('Producto agotado. Ya no se puede anadir al carrito.');
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.toastService.show({
        title: 'Necesitas iniciar sesion',
        message: 'Inicia sesion para anadir productos al carrito.',
      });
      void this.router.navigate(['/login']);
      return;
    }

    this.addingProductId.set(product.id);

    this.shopService
      .addItem(product.id, 1)
      .pipe(finalize(() => this.addingProductId.set(null)))
      .subscribe({
        next: () => {
          this.toastService.show({
            title: 'Producto anadido',
            message: `${product.name} ya esta en tu carrito.`,
          });
        },
        error: (error) => {
          this.toastService.showError(
            error.error?.message ?? 'No se pudo anadir el producto al carrito.',
          );
        },
      });
  }

  private getProductCardVariant(
    index: number,
    totalProducts: number,
  ): CatalogProductCardVariant {
    if (totalProducts <= 1) {
      return 'featured';
    }

    if (totalProducts === 2) {
      return index === 0 ? 'featured' : 'standard';
    }

    const pattern: readonly CatalogProductCardVariant[] = [
      'featured',
      'standard',
      'compact',
      'standard',
      'featured',
      'compact',
    ];

    return pattern[index % pattern.length];
  }
}
