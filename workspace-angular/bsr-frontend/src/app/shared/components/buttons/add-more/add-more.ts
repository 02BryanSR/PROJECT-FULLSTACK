import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-add-more-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './add-more.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMoreButton {
  private readonly router = inject(Router);

  readonly routerLink = input<string | readonly unknown[] | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly extraClass = input<string>('');

  readonly classes = computed(
    () =>
      'inline-flex items-center justify-center gap-2 h-8 px-3 bg-primary-500 hover:bg-primary-700 text-white text-2xs font-medium rounded-base cursor-pointer transition-all duration-200 hover:shadow-sm hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ' +
      this.extraClass(),
  );

  handleClick(): void {
    const link = this.routerLink();
    if (link) {
      this.router.navigate(Array.isArray(link) ? (link as string[]) : [link]);
    }
  }
}
