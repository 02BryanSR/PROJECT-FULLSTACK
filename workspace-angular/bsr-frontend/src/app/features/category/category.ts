import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { CategoryService } from './category.service';
import { CategoryModel } from './category.api';
import { CategoryDialog, CategoryDialogData } from './category-dialog';
import { ConfirmDialog } from './confirm-dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
})
export class Category implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  readonly displayedColumns = ['id', 'name', 'actions'];
  readonly dataSource = new MatTableDataSource<CategoryModel>([]);
  loading = false;

  constructor(
    private readonly api: CategoryService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.api.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (rows) => {
          this.dataSource.data = rows;
          this.dataSource.sort = this.sort;
          // this.loading = false;
        },
        error: () => {
          // this.loading = false;
          this.snack.open('Error cargando categorías', 'OK', { duration: 2500 });
        },
      });
  }

  openCreate(): void {
    const data: CategoryDialogData = { mode: 'create' };
    const ref = this.dialog.open(CategoryDialog, { width: '420px', data });

    ref.afterClosed().subscribe((result?: { name: string, description: string }) => {
      if (!result) return;
      this.api.create({ name: result.name, description: result.description }).subscribe({
        next: () => { this.snack.open('Creada', 'OK', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error creando', 'OK', { duration: 2500 }),
      });
    });
  }

  openEdit(row: CategoryModel): void {
    const data: CategoryDialogData = { mode: 'edit', category: row };
    const ref = this.dialog.open(CategoryDialog, { width: '420px', data });

    ref.afterClosed().subscribe((result?: { name: string, description: string }) => {
      if (!result) return;
      this.api.update(row.id, { name: result.name, description: result.description }).subscribe({
        next: () => { this.snack.open('Actualizada', 'OK', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error actualizando', 'OK', { duration: 2500 }),
      });
    });
  }

  confirmDelete(row: CategoryModel): void {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '420px',
      data: `¿Eliminar "${row.name}"?`,
    });

    ref.afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.api.delete(row.id).subscribe({
        next: () => { this.snack.open('Eliminada', 'OK', { duration: 2000 }); this.load(); },
        error: () => this.snack.open('Error eliminando', 'OK', { duration: 2500 }),
      });
    });
  }
}
