import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogProduct } from '../../../core/interfaces/catalog.interface';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ToastService } from '../../../core/services/toast.service';

export type CatalogProductCardVariant = 'featured' | 'standard' | 'compact';

@Component({
  selector: 'app-catalog-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './catalog-product-card.html',
  host: {
    class: 'block h-full',
  },
})
export class CatalogProductCardComponent {
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);
  private readonly toastService = inject(ToastService);

  readonly product = input.required<CatalogProduct>();
  readonly variant = input<CatalogProductCardVariant>('standard');
  readonly busy = input(false);
  readonly add = output<CatalogProduct>();
  readonly isFavorite = computed(() => this.favoritesService.isFavorite(this.product().id));

  readonly articleClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'md:col-span-6 xl:col-span-6';
      case 'compact':
        return 'md:col-span-3 xl:col-span-3';
      default:
        return 'md:col-span-3 xl:col-span-4';
    }
  });

  readonly mediaClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'aspect-[4/5] min-h-[26rem] md:min-h-[34rem]';
      case 'compact':
        return 'aspect-[4/5] min-h-[18rem]';
      default:
        return 'aspect-[4/5] min-h-[22rem]';
    }
  });

  readonly titleClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'text-2xl md:text-3xl';
      case 'compact':
        return 'text-lg';
      default:
        return 'text-xl';
    }
  });

  readonly bodyClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'space-y-5 p-6';
      case 'compact':
        return 'space-y-3 p-4';
      default:
        return 'space-y-4 p-5';
    }
  });

  openProductDetail(): void {
    void this.router.navigate(['/products', this.product().id]);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.openProductDetail();
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();

    this.favoritesService.toggle(this.product().id).subscribe({
      next: (isFavorite) => {
        this.toastService.show({
          title: isFavorite ? 'Guardado en favoritos' : 'Eliminado de favoritos',
          message: `${this.product().name} ${isFavorite ? 'ya esta en tus favoritos' : 'ha salido de tus favoritos'}.`,
        });
      },
      error: (error) => {
        this.toastService.showError(
          error.error?.message ?? 'No se pudo actualizar el favorito.',
        );
      },
    });
  }

  requestAdd(event: Event): void {
    event.stopPropagation();
    this.add.emit(this.product());
  }
}
