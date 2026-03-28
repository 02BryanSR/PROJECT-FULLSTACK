import { Component } from '@angular/core';
import {
  CategoryShowcaseComponent,
  CategoryShowcaseImage,
  CategoryShowcasePanel,
} from '../category-showcase/category-showcase';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CategoryShowcaseComponent],
  templateUrl: './kids.html',
})
export class Kids {
  readonly highlights: readonly string[] = [
    'Easy sets',
    'Active color',
    'Daily movement',
  ];

  readonly panels: readonly CategoryShowcasePanel[] = [
    {
      eyebrow: 'Edit',
      title: 'Play all day',
      description:
        'A fresh structure for colorful looks, comfortable fits and a more energetic browsing experience across the category.',
    },
    {
      eyebrow: 'Capsule',
      title: 'Mini icons',
      description:
        'Ideal for hero pieces, new drops and styled combinations that make the kids section feel playful and modern.',
    },
    {
      eyebrow: 'Focus',
      title: 'Ready to move',
      description:
        'Prepared for future catalog cards, promo banners and a complete kids shopping flow with a stronger visual identity.',
    },
  ];

  readonly gallery: readonly CategoryShowcaseImage[] = [
    {
      src: '/images/home-4-2.jpg',
      alt: 'Kids collection movement look',
      caption: 'Movement first',
    },
    {
      src: '/images/home-4-3.jpg',
      alt: 'Kids collection colorful look',
      caption: 'Color layers',
    },
    {
      src: '/images/home-4-4.jpg',
      alt: 'Kids collection daily set',
      caption: 'Daily sets',
    },
  ];
}
