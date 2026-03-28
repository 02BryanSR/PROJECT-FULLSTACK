import { Component } from '@angular/core';
import {
  CategoryShowcaseComponent,
  CategoryShowcaseImage,
  CategoryShowcasePanel,
} from '../category-showcase/category-showcase';

@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CategoryShowcaseComponent],
  templateUrl: './accessories.html',
})
export class Accessories {
  readonly highlights: readonly string[] = [
    'Statement bags',
    'Mixed textures',
    'Final details',
  ];

  readonly panels: readonly CategoryShowcasePanel[] = [
    {
      eyebrow: 'Edit',
      title: 'Finish the look',
      description:
        'A strong visual base for bags, eyewear, belts and jewelry that completes the styling story across the store.',
    },
    {
      eyebrow: 'Capsule',
      title: 'Statement pieces',
      description:
        'Designed to support hero accessories, seasonal highlights and quick-purchase products with more visual impact.',
    },
    {
      eyebrow: 'Focus',
      title: 'Daily essentials',
      description:
        'Ready to expand with filters, featured blocks and a richer catalog experience for accessories.',
    },
  ];

  readonly gallery: readonly CategoryShowcaseImage[] = [
    {
      src: '/images/home-5.jpg',
      alt: 'Accessories collection hero look',
      caption: 'Statement accents',
    },
    {
      src: '/images/home-2-2.jpg',
      alt: 'Accessories collection textured look',
      caption: 'Texture focus',
    },
    {
      src: '/images/home2-4.jpg',
      alt: 'Accessories collection final styling details',
      caption: 'Final details',
    },
  ];
}
