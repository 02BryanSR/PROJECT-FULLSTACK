import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
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
export class AdminCategories implements OnDestroy {
  private readonly adminService = inject(AdminService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private objectUrl: string | null = null;

  readonly categories = signal<readonly AdminCategory[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly imageFile = signal<File | null>(null);
  readonly imagePreview = signal<string | null>(null);
  readonly isEditing = computed(() => this.selectedCategoryId() !== null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    imageUrl: [''],
  });

  constructor() {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.releaseObjectUrl();
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
    this.imageFile.set(null);
    this.setPreview(null);
    this.form.reset({
      name: '',
      description: '',
      imageUrl: '',
    });
  }

  startEdit(category: AdminCategory): void {
    this.selectedCategoryId.set(category.id);
    this.imageFile.set(null);
    this.form.reset({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl ?? '',
    });
    this.setPreview(category.imageUrl);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.showFormValidationError();
      return;
    }

    const rawValue = this.form.getRawValue();
    const payload: AdminCategoryInput = {
      name: rawValue.name?.trim() || '',
      description: rawValue.description?.trim() || '',
      imageUrl: rawValue.imageUrl?.trim() || null,
      imageFile: this.imageFile(),
    };

    const selectedCategoryId = this.selectedCategoryId();
    const request$ =
      selectedCategoryId === null
        ? this.adminService.createCategory(payload)
        : this.adminService.updateCategory(selectedCategoryId, payload);

    this.saving.set(true);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (category) => {
        this.applyStoredImageUrl(category.imageUrl);
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

  onImageFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.imageFile.set(file);

    if (!file) {
      this.setPreview(this.form.controls.imageUrl.value?.trim() || null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    this.form.patchValue({ imageUrl: previewUrl });
    this.setPreview(previewUrl, true);
  }

  onImageUrlInput(): void {
    if (this.imageFile()) {
      return;
    }

    this.setPreview(this.form.controls.imageUrl.value?.trim() || null);
  }

  clearImage(): void {
    this.imageFile.set(null);
    this.form.patchValue({ imageUrl: '' });
    this.setPreview(null);
  }

  private setPreview(url: string | null, isObjectUrl = false): void {
    this.releaseObjectUrl();

    if (isObjectUrl && url) {
      this.objectUrl = url;
    }

    this.imagePreview.set(url);
  }

  private releaseObjectUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  private applyStoredImageUrl(imageUrl: string | null): void {
    const normalizedImageUrl = imageUrl?.trim() || '';

    if (!normalizedImageUrl) {
      return;
    }

    this.form.patchValue({ imageUrl: normalizedImageUrl });

    if (!window.isSecureContext || !navigator.clipboard?.writeText) {
      return;
    }

    void navigator.clipboard.writeText(normalizedImageUrl).catch(() => undefined);
  }
}
