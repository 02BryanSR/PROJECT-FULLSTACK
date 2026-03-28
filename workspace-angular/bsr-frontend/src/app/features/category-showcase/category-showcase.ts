import { Component, computed, input } from '@angular/core';

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
  templateUrl: './category-showcase.html',
})
export class CategoryShowcaseComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly accent = input.required<string>();
  readonly heroImage = input.required<string>();
  readonly heroAlt = input.required<string>();
  readonly highlights = input.required<readonly string[]>();
  readonly panels = input.required<readonly CategoryShowcasePanel[]>();
  readonly gallery = input.required<readonly CategoryShowcaseImage[]>();

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
}
