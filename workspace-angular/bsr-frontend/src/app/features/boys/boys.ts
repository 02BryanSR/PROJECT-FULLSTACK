import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { type CategorySlug } from '../../core/interfaces/catalog.interface';
import { CatalogService } from '../../core/services/catalog.service';
import { buildCategoryShowcaseContent } from '../category-showcase/category-showcase-content';
import { CategoryShowcaseComponent } from '../category-showcase/category-showcase';

const CATEGORY_SLUG: CategorySlug = 'boys';

@Component({
  selector: 'app-boys',
  standalone: true,
  imports: [CategoryShowcaseComponent],
  templateUrl: './boys.html',
})
export class Boys {
  private readonly catalogService = inject(CatalogService);

  readonly showcase = toSignal(
    this.catalogService.getCategoryBySlug(CATEGORY_SLUG).pipe(
      switchMap((category) => {
        if (!category) {
          return of(buildCategoryShowcaseContent(CATEGORY_SLUG, null, []));
        }

        return this.catalogService
          .getProductsByCategoryId(category.id)
          .pipe(map((products) => buildCategoryShowcaseContent(CATEGORY_SLUG, category, products)));
      }),
    ),
    { initialValue: buildCategoryShowcaseContent(CATEGORY_SLUG, null, []) },
  );
}
