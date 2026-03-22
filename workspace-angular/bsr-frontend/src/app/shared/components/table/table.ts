import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon';

export type TableColumnType = 'text' | 'badge';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: TableColumnType;
}

export interface TableAction {
  label: string;
  value: string;
  danger?: boolean;
}

export type TableRow = Record<string, unknown> & {
  id?: string | number;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgClass, IconComponent],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  readonly data = input<TableRow[]>([]);
  readonly columns = input<TableColumn[]>([]);
  readonly emptyMessage = input('No hay datos disponibles.');
  readonly allSelected = input(false);
  readonly actions = input<TableAction[]>([]);
  readonly actionsOpen = input(false);
  readonly selectedIds = input<(string | number)[]>([]);
  readonly sortKey = input<string>('');
  readonly sortDir = input<'asc' | 'desc'>('desc');

  readonly toggleAll = output<boolean>();
  readonly toggleActions = output<void>();
  readonly action = output<string>();
  readonly rowSelection = output<string | number>();
  readonly sort = output<string>();
  readonly rowClick = output<string | number>();

  isSelected(row: TableRow, index: number): boolean {
    return this.selectedIds().includes(this.getRowId(row, index));
  }

  getRowId(row: TableRow, index: number): string | number {
    return row.id ?? index;
  }

  getCellValue(row: TableRow, key: string): string {
    const value = row[key];
    return value == null ? '' : String(value);
  }

  getCellClass(row: TableRow, key: string): string {
    const value = row[`${key}Class`];
    return typeof value === 'string' ? value : '';
  }
}
