import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import {
  AdminCategory,
  AdminProduct,
  AdminProductInput,
} from '../../../core/interfaces/admin.interface';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './products.html',
})
export class AdminProducts implements OnDestroy {
  private readonly adminService = inject(AdminService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);

  private objectUrl: string | null = null;

  readonly products = signal<readonly AdminProduct[]>([]);
  readonly categories = signal<readonly AdminCategory[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly selectedProductId = signal<number | null>(null);
  readonly imageFile = signal<File | null>(null);
  readonly imagePreview = signal<string | null>(null);
  readonly isEditing = computed(() => this.selectedProductId() !== null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: [null as number | null, [Validators.required]],
    imageUrl: [''],
  });

  constructor() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.releaseObjectUrl();
  }

  loadData(): void {
    this.loading.set(true);

    forkJoin({
      products: this.adminService.getProducts(),
      categories: this.adminService.getCategories(),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ products, categories }) => {
          this.products.set(products);
          this.categories.set(categories);

          if (!this.form.controls.categoryId.value && categories.length) {
            this.form.patchValue({ categoryId: categories[0].id });
          }
        },
        error: () => {
          this.products.set([]);
          this.categories.set([]);
          this.toastService.showError(
            'No se pudieron cargar los productos o las categorias del panel admin.',
          );
        },
      });
  }

  startCreate(): void {
    this.selectedProductId.set(null);
    this.imageFile.set(null);
    this.setPreview(null);
    this.form.reset({
      name: '',
      price: 0,
      stock: 0,
      categoryId: this.categories()[0]?.id ?? null,
      imageUrl: '',
    });
  }

  startEdit(product: AdminProduct): void {
    this.selectedProductId.set(product.id);
    this.imageFile.set(null);
    this.form.reset({
      name: product.name,
      price: product.price ?? 0,
      stock: product.stock ?? 0,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl ?? '',
    });
    this.setPreview(product.imageUrl);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const categoryId = Number(rawValue.categoryId);

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      this.form.controls.categoryId.markAsTouched();
      return;
    }

    const payload: AdminProductInput = {
      name: rawValue.name?.trim() || '',
      price: Number(rawValue.price ?? 0),
      stock: Number(rawValue.stock ?? 0),
      categoryId,
      imageUrl: rawValue.imageUrl?.trim() || null,
      imageFile: this.imageFile(),
    };

    const selectedProductId = this.selectedProductId();
    const request$ =
      selectedProductId === null
        ? this.adminService.createProduct(payload)
        : this.adminService.updateProduct(selectedProductId, payload);

    this.saving.set(true);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (product) => {
        this.toastService.show({
          title: selectedProductId === null ? 'Producto creado' : 'Producto actualizado',
          message: `El producto ${product.name} ya esta sincronizado con el panel admin.`,
        });
        this.loadData();
        this.startEdit(product);
      },
      error: () => {
        this.toastService.showError('No se pudo guardar el producto. Revisa los datos del formulario.');
      },
    });
  }

  deleteProduct(product: AdminProduct): void {
    const confirmed = window.confirm(`Quieres eliminar el producto "${product.name}"?`);

    if (!confirmed) {
      return;
    }

    this.saving.set(true);

    this.adminService
      .deleteProduct(product.id)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          this.toastService.show({
            title: 'Producto eliminado',
            message: `El producto ${product.name} se ha eliminado correctamente.`,
          });
          this.loadData();

          if (this.selectedProductId() === product.id) {
            this.startCreate();
          }
        },
        error: () => {
          this.toastService.showError('No se pudo eliminar el producto.');
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

    this.form.patchValue({ imageUrl: '' });
    this.setPreview(URL.createObjectURL(file), true);
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
}
