import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { CatalogProduct } from '../../../core/interfaces/catalog.interface';

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
  readonly product = input.required<CatalogProduct>();
  readonly variant = input<CatalogProductCardVariant>('standard');
  readonly busy = input(false);
  readonly add = output<CatalogProduct>();

  readonly articleClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'xl:col-span-3 xl:row-span-2';
      case 'compact':
        return 'xl:col-span-2';
      default:
        return 'xl:col-span-3';
    }
  });

  readonly mediaClasses = computed(() => {
    switch (this.variant()) {
      case 'featured':
        return 'h-96 md:h-[28rem]';
      case 'compact':
        return 'h-56';
      default:
        return 'h-72';
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
        return 'space-y-4 p-4';
      default:
        return 'space-y-4 p-5';
    }
  });

  requestAdd(): void {
    this.add.emit(this.product());
  }
}
