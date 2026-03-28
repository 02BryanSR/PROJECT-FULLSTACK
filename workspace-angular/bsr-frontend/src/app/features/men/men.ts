import { Component } from '@angular/core';
import {
  CategoryShowcaseComponent,
  CategoryShowcaseImage,
  CategoryShowcasePanel,
} from '../category-showcase/category-showcase';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CategoryShowcaseComponent],
  templateUrl: './men.html',
})
export class Men {
  readonly highlights: readonly string[] = [
    'Premium denim',
    'Urban layering',
    'Deep neutrals',
  ];

  readonly panels: readonly CategoryShowcasePanel[] = [
    {
      eyebrow: 'Edit',
      title: 'Street tailoring',
      description:
        'A layout designed for relaxed tailoring, wider silhouettes and elevated basics with a stronger urban identity.',
    },
    {
      eyebrow: 'Capsule',
      title: 'Core layers',
      description:
        'Sweatshirts, jackets and midweight essentials ready to support featured drops and category storytelling.',
    },
    {
      eyebrow: 'Focus',
      title: 'Weekend uniform',
      description:
        'Versatile looks built for future product cards, editorial sections and strong campaign highlights.',
    },
  ];

  readonly gallery: readonly CategoryShowcaseImage[] = [
    {
      src: '/images/home-1-1.jpg',
      alt: 'Men collection hero look',
      caption: 'Core menswear',
    },
    {
      src: '/images/home-2-1.jpg',
      alt: 'Men collection layered look',
      caption: 'Layered denim',
    },
    {
      src: '/images/home2-3.jpg',
      alt: 'Men collection streetwear look',
      caption: 'Street essentials',
    },
  ];
}
