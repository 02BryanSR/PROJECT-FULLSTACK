import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';
import { PRIMARY_NAV_LINKS, type NavigationLink } from '../constants/navigation.constants';
import {
  type CatalogCategory,
  type CatalogProduct,
  type CategoryApiResponse,
  type CategorySlug,
  type ProductApiResponse,
} from '../interfaces/catalog.interface';

const CATEGORY_ALIASES: Record<CategorySlug, readonly string[]> = {
  women: ['women', 'woman', 'mujer', 'mujeres', 'ladies', 'lady'],
  men: ['men', 'man', 'hombre', 'hombres'],
  kids: ['kids', 'kid', 'nino', 'nina', 'ninos', 'ninas', 'children', 'child', 'infantil'],
  accessories: ['accessories', 'accessory', 'accesorio', 'accesorios', 'complemento', 'complementos'],
};

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly http = inject(HttpClient);

  private readonly categoriesRequest$ = this.http
    .get<CategoryApiResponse[]>(API_ENDPOINTS.catalog.categories)
    .pipe(
      map((categories) => categories.map((category) => this.mapCategory(category))),
      catchError(() => of([] as CatalogCategory[])),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  getCategories(): Observable<readonly CatalogCategory[]> {
    return this.categoriesRequest$;
  }

  getCategoryBySlug(slug: CategorySlug): Observable<CatalogCategory | null> {
    return this.categoriesRequest$.pipe(
      map((categories) => categories.find((category) => category.slug === slug) ?? null),
    );
  }

  getProductsByCategoryId(categoryId: number): Observable<readonly CatalogProduct[]> {
    return this.http.get<ProductApiResponse[]>(API_ENDPOINTS.catalog.productsByCategory(categoryId)).pipe(
      map((products) => products.map((product) => this.mapProduct(product))),
      catchError(() => of([] as CatalogProduct[])),
    );
  }

  getProductById(productId: number): Observable<CatalogProduct | null> {
    return this.http.get<ProductApiResponse>(API_ENDPOINTS.catalog.product(productId)).pipe(
      map((product) => this.mapProduct(product)),
      catchError(() => of(null)),
    );
  }

  getProductsByIds(productIds: readonly number[]): Observable<readonly CatalogProduct[]> {
    const uniqueProductIds = [...new Set(productIds.filter((productId) => Number.isFinite(productId)))];

    if (!uniqueProductIds.length) {
      return of([]);
    }

    return forkJoin(uniqueProductIds.map((productId) => this.getProductById(productId))).pipe(
      map((products) => products.filter((product): product is CatalogProduct => !!product)),
    );
  }

  getNavigationLinks(): Observable<readonly NavigationLink[]> {
    return this.categoriesRequest$.pipe(
      map((categories) => {
        const dynamicLinks = categories
          .filter((category) => !!category.route)
          .map((category) => ({
            label: category.name.trim().toUpperCase(),
            route: category.route!,
          }));

        if (!dynamicLinks.length) {
          return PRIMARY_NAV_LINKS;
        }

        return [PRIMARY_NAV_LINKS[0], ...dynamicLinks];
      }),
      catchError(() => of(PRIMARY_NAV_LINKS)),
    );
  }

  private mapCategory(category: CategoryApiResponse): CatalogCategory {
    const slug = this.resolveCategorySlug(category.name);

    return {
      id: category.id,
      name: category.name?.trim() || 'Categoria',
      description: category.description?.trim() || '',
      productIds: category.productIds ?? [],
      slug,
      route: slug ? `/${slug}` : null,
    };
  }

  private mapProduct(product: ProductApiResponse): CatalogProduct {
    return {
      id: product.id,
      name: product.name?.trim() || 'Producto',
      price: typeof product.price === 'number' ? product.price : null,
      stock: typeof product.stock === 'number' ? product.stock : null,
      categoryId: product.categoryId,
      imageUrl: this.resolveBackendAssetUrl(
        product.imageUrl ?? product.image ?? product.imagePath ?? product.thumbnailUrl ?? null,
      ),
    };
  }

  private resolveCategorySlug(categoryName: string | null | undefined): CategorySlug | null {
    const normalizedName = this.normalizeText(categoryName);

    if (!normalizedName) {
      return null;
    }

    for (const [slug, aliases] of Object.entries(CATEGORY_ALIASES) as [
      CategorySlug,
      readonly string[],
    ][]) {
      if (aliases.some((alias) => normalizedName === alias || normalizedName.includes(alias))) {
        return slug;
      }
    }

    return null;
  }

  private normalizeText(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private resolveBackendAssetUrl(assetPath: string | null): string | null {
    const normalizedPath = assetPath?.trim();

    if (!normalizedPath) {
      return null;
    }

    if (
      normalizedPath.startsWith('http://') ||
      normalizedPath.startsWith('https://') ||
      normalizedPath.startsWith('data:') ||
      normalizedPath.startsWith('blob:')
    ) {
      return normalizedPath;
    }

    if (normalizedPath.startsWith('/')) {
      return `${API_BASE_URL}${normalizedPath}`;
    }

    return `${API_BASE_URL}/${normalizedPath.replace(/^\/+/, '')}`;
  }
}
