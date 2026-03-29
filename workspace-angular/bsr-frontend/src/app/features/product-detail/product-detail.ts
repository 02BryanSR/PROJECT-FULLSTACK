import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { CatalogProduct } from '../../core/interfaces/catalog.interface';
import { AuthService } from '../../core/services/auth.service';
import { CatalogService } from '../../core/services/catalog.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { ShopService } from '../../core/services/shop.service';
import { ToastService } from '../../core/services/toast.service';
import { CatalogProductCardComponent } from '../../shared/components/catalog-product-card/catalog-product-card';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CatalogProductCardComponent],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly catalogService = inject(CatalogService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly shopService = inject(ShopService);
  private readonly toastService = inject(ToastService);

  readonly product = signal<CatalogProduct | null>(null);
  readonly relatedProducts = signal<readonly CatalogProduct[]>([]);
  readonly loading = signal(true);
  readonly adding = signal(false);
  readonly isFavorite = computed(() => {
    const product = this.product();
    return product ? this.favoritesService.isFavorite(product.id) : false;
  });
  readonly productReference = computed(() => {
    const product = this.product();

    if (!product) {
      return '';
    }

    return product.sku?.trim() || `${String(product.categoryId).padStart(3, '0')}/${String(product.id).padStart(4, '0')}`;
  });
  readonly productNarrative = computed(() => {
    const product = this.product();

    if (!product) {
      return '';
    }

    if (product.description.trim()) {
      return product.description.trim();
    }

    return `${product.name} forma parte del catalogo real conectado a tu backend y esta listo para comprarse desde carrito y checkout.`;
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));

      if (!Number.isFinite(productId) || productId <= 0) {
        void this.router.navigate(['/home']);
        return;
      }

      this.loadProduct(productId);
    });
  }

  addToCart(product: CatalogProduct | null = this.product()): void {
    if (!product) {
      return;
    }

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

    this.adding.set(true);

    this.shopService
      .addItem(product.id, 1)
      .pipe(finalize(() => this.adding.set(false)))
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

  toggleFavorite(): void {
    const product = this.product();

    if (!product) {
      return;
    }

    this.favoritesService.toggle(product.id).subscribe({
      next: (isFavorite) => {
        this.toastService.show({
          title: isFavorite ? 'Guardado en favoritos' : 'Eliminado de favoritos',
          message: `${product.name} ${isFavorite ? 'ya esta en tus favoritos' : 'ha salido de tus favoritos'}.`,
        });
      },
      error: (error) => {
        this.toastService.showError(
          error.error?.message ?? 'No se pudo actualizar el favorito.',
        );
      },
    });
  }

  private loadProduct(productId: number): void {
    this.loading.set(true);

    this.catalogService
      .getProductById(productId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (product) => {
          if (!product) {
            this.product.set(null);
            this.relatedProducts.set([]);
            this.toastService.showError('No se encontro el producto solicitado.');
            void this.router.navigate(['/home']);
            return;
          }

          this.product.set(product);
          this.loadRelatedProducts(product);
        },
        error: () => {
          this.product.set(null);
          this.relatedProducts.set([]);
          this.toastService.showError('No se pudo cargar el producto.');
        },
      });
  }

  private loadRelatedProducts(product: CatalogProduct): void {
    this.catalogService.getProductsByCategoryId(product.categoryId).subscribe({
      next: (products) => {
        this.relatedProducts.set(
          products.filter((candidate) => candidate.id !== product.id).slice(0, 3),
        );
      },
      error: () => {
        this.relatedProducts.set([]);
      },
    });
  }
}
