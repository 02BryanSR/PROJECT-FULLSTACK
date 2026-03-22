import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shop-section.html',
})
export class ShopSection {
  private readonly route = inject(ActivatedRoute);

  readonly title = this.route.snapshot.data['title'] as string;
  readonly eyebrow = this.route.snapshot.data['eyebrow'] as string;
  readonly description = this.route.snapshot.data['description'] as string;
}
