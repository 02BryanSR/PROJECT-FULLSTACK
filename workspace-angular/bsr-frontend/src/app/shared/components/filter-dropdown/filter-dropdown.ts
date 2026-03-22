import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon';
import { ClickOutsideDirective } from '../../directives/click-outside';

@Component({
  selector: 'app-filter-dropdown',
  standalone: true,
  imports: [NgTemplateOutlet, IconComponent, ClickOutsideDirective],
  templateUrl: './filter-dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDropdown {
  readonly isOpen = input(false);
  readonly showChevron = input(true);
  readonly buttonClass = input('');
  readonly opened = output<void>();
  readonly closed = output<void>();

  toggle(): void {
    this.isOpen() ? this.closed.emit() : this.opened.emit();
  }

  close(): void {
    if (this.isOpen()) this.closed.emit();
  }
}
