import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel } from './category.api';

export type CategoryDialogData = { mode: 'create' | 'edit'; category?: CategoryModel };

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-dialog.html',
  styleUrls: ['./category-dialog.css'],
})
export class CategoryDialog {
  private readonly data = inject<CategoryDialogData>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<CategoryDialog>);

  readonly name = new FormControl(this.data.category?.name ?? '', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  });

  readonly description = new FormControl(this.data.category?.description ?? '', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });

  title = this.data.mode === 'create' ? 'Agregar categoría' : 'Editar categoría';

  save(): void {
    if (this.name.invalid) return;
    this.ref.close({ name: this.name.value.trim(), description: this.description.value.trim() });
  }

  close(): void {
    this.ref.close();
  }
}
