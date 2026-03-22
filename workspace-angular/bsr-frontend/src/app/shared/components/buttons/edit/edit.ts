import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButton {
  private readonly router = inject(Router);

  readonly routerLink = input<string | readonly unknown[] | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);

  handleClick(): void {
    const link = this.routerLink();

    if (this.disabled() || !link) {
      return;
    }

    this.router.navigate(Array.isArray(link) ? (link as string[]) : [link]);
  }
}
