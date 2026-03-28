export type CategorySlug = 'women' | 'men' | 'kids' | 'accessories';

export interface CategoryApiResponse {
  id: number;
  name: string;
  description: string | null;
  productIds?: number[] | null;
}

export interface ProductApiResponse {
  id: number;
  name: string;
  price: number | null;
  stock: number | null;
  categoryId: number;
  imageUrl?: string | null;
  image?: string | null;
  imagePath?: string | null;
  thumbnailUrl?: string | null;
}

export interface CatalogCategory {
  id: number;
  name: string;
  description: string;
  productIds: readonly number[];
  slug: CategorySlug | null;
  route: string | null;
}

export interface CatalogProduct {
  id: number;
  name: string;
  price: number | null;
  stock: number | null;
  categoryId: number;
  imageUrl: string | null;
}
