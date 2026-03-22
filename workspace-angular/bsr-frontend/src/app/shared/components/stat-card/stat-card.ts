import { Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon';

export interface Stat {
  title: string;
  value: string | number;
  label: string;
  icon: string;
  trend?: string;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <article class="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-2">
      <header class="flex justify-between items-start">
        <h3 class="text-neutral-300 text-sm font-medium">{{ stat().title }}</h3>
        <div class="p-2 bg-ghost-50 rounded-lg">
          <app-icon [name]="stat().icon" class="w-5 h-5 text-neutral-600" />
        </div>
      </header>

      <div class="flex flex-col">
        <p class="text-3xl font-bold text-neutral-900">{{ stat().value }}</p>
        <div class="flex items-center gap-1 mt-1">
          @if (stat().trend) {
            <span class="text-success-600 text-sm font-semibold">{{ stat().trend }}</span>
          }
          <span class="text-neutral-250 text-sm">{{ stat().label }}</span>
        </div>
      </div>
    </article>
  `,
})
export class StatCard {
  stat = input.required<Stat>();
}
