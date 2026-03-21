export interface CategoryModel {
  id: number;
  name: string;
  description: string;
}
export type CategoryCreate = Pick<CategoryModel, 'name' | 'description'>;
