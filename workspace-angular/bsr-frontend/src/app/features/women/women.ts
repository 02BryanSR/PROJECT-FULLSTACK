import { Component } from '@angular/core';
import {
  CategoryShowcaseComponent,
  CategoryShowcaseImage,
  CategoryShowcasePanel,
} from '../category-showcase/category-showcase';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CategoryShowcaseComponent],
  templateUrl: './women.html',
})
export class Women {
  readonly highlights: readonly string[] = [
    'Light tailoring',
    'Satin textures',
    'Evening layers',
  ];

  readonly panels: readonly CategoryShowcasePanel[] = [
    {
      eyebrow: 'Edit',
      title: 'New essentials',
      description:
        'A refined mix of clean silhouettes and versatile staples designed for everyday dressing with a sharper point of view.',
    },
    {
      eyebrow: 'Capsule',
      title: 'After dark',
      description:
        'Fluid dresses, subtle shine and structured shapes ready to support a stronger evening fashion story.',
    },
    {
      eyebrow: 'Focus',
      title: 'Weekend reset',
      description:
        'Relaxed pieces with a premium edge, ideal for editorial blocks, featured collections and future product grids.',
    },
  ];

  readonly gallery: readonly CategoryShowcaseImage[] = [
    {
      src: '/images/home-1-2.jpg',
      alt: 'Women collection hero look',
      caption: 'Main edit',
    },
    {
      src: '/images/home-3-2.jpg',
      alt: 'Women collection editorial look',
      caption: 'Fluid silhouettes',
    },
    {
      src: '/images/home-4-1.jpg',
      alt: 'Women collection premium details',
      caption: 'Premium details',
    },
  ];
}
