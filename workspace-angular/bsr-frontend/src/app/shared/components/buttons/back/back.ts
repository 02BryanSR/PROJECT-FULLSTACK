import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { IconComponent } from '../../icon/icon';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './back.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButton {
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
