import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AdminCategory, AdminCategoryInput } from '../../../core/interfaces/admin.interface';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './categories.html',
})
export class AdminCategories {
  private readonly adminService = inject(AdminService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  readonly categories = signal<readonly AdminCategory[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly isEditing = computed(() => this.selectedCategoryId() !== null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);

    this.adminService
      .getCategories()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: () => {
          this.categories.set([]);
          this.toastService.showError('No se pudieron cargar las categorias.');
        },
      });
  }

  startCreate(): void {
    this.selectedCategoryId.set(null);
    this.form.reset({
      name: '',
      description: '',
    });
  }

  startEdit(category: AdminCategory): void {
    this.selectedCategoryId.set(category.id);
    this.form.reset({
      name: category.name,
      description: category.description,
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const payload: AdminCategoryInput = {
      name: rawValue.name?.trim() || '',
      description: rawValue.description?.trim() || '',
    };

    const selectedCategoryId = this.selectedCategoryId();
    const request$ =
      selectedCategoryId === null
        ? this.adminService.createCategory(payload)
        : this.adminService.updateCategory(selectedCategoryId, payload);

    this.saving.set(true);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (category) => {
        this.toastService.show({
          title: selectedCategoryId === null ? 'Categoria creada' : 'Categoria actualizada',
          message: `La categoria ${category.name} ya esta disponible en el panel admin.`,
        });
        this.loadCategories();
        this.startEdit(category);
      },
      error: () => {
        this.toastService.showError('No se pudo guardar la categoria.');
      },
    });
  }

  deleteCategory(category: AdminCategory): void {
    const confirmed = window.confirm(`Quieres eliminar la categoria "${category.name}"?`);

    if (!confirmed) {
      return;
    }

    this.saving.set(true);

    this.adminService
      .deleteCategory(category.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            title: 'Categoria eliminada',
            message: `La categoria ${category.name} se ha eliminado correctamente.`,
          });
          this.loadCategories();

          if (this.selectedCategoryId() === category.id) {
            this.startCreate();
          }
        },
        error: () => {
          this.toastService.showError('No se pudo eliminar la categoria.');
        },
      });
  }
}
