import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { IconComponent } from '../../icon/icon';

@Component({
  selector: 'app-clear-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './clear-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClearFiltersButton {
  readonly clear = output<void>();
}
