import { Component, DestroyRef, OnDestroy, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, forkJoin, merge } from 'rxjs';
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
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
})
export class AdminProducts implements OnDestroy {
  private readonly adminService = inject(AdminService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  });

  private objectUrl: string | null = null;

  readonly products = signal<readonly AdminProduct[]>([]);
  readonly categories = signal<readonly AdminCategory[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly selectedProductId = signal<number | null>(null);
  readonly imageFile = signal<File | null>(null);
  readonly imagePreview = signal<string | null>(null);
  readonly brokenImageIds = signal<readonly number[]>([]);
  readonly isEditing = computed(() => this.selectedProductId() !== null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    sku: ['', [Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [50, [Validators.required, Validators.min(0)]],
    categoryId: [null as number | null, [Validators.required]],
    imageUrl: [''],
  });

  constructor() {
    merge(this.form.controls.categoryId.valueChanges, this.form.controls.name.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncGeneratedSku());

    this.loadData();
  }

  ngOnDestroy(): void {
    this.releaseObjectUrl();
  }

  loadData(resetForm = false): void {
    this.loading.set(true);

    forkJoin({
      products: this.adminService.getProducts(),
      categories: this.adminService.getCategories(),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ products, categories }) => {
          this.brokenImageIds.set([]);
          const categoriesById = new Map(categories.map((category) => [category.id, category.name]));

          this.products.set(
            products.map((product) => ({
              ...product,
              categoryName:
                (product.categoryId !== null ? categoriesById.get(product.categoryId) : null) ||
                product.categoryName,
            })),
          );
          this.categories.set(categories);

          if (resetForm) {
            this.startCreate();
            return;
          }

          if (!this.form.controls.categoryId.value && categories.length) {
            this.form.patchValue({ categoryId: categories[0].id });
          }

          this.syncGeneratedSku();
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
      sku: this.generateSkuPreview(this.categories()[0]?.id ?? null),
      description: '',
      price: 0,
      stock: 50,
      categoryId: this.categories()[0]?.id ?? null,
      imageUrl: '',
    });
  }

  startEdit(product: AdminProduct): void {
    this.selectedProductId.set(product.id);
    this.imageFile.set(null);
    this.form.reset({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price ?? 0,
      stock: product.stock ?? 0,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl ?? '',
    });
    this.setPreview(product.imageUrl);
  }

  isBrokenImage(productId: number): boolean {
    return this.brokenImageIds().includes(productId);
  }

  markImageAsBroken(productId: number): void {
    if (this.brokenImageIds().includes(productId)) {
      return;
    }

    this.brokenImageIds.update((ids) => [...ids, productId]);
  }

  imageSrc(product: AdminProduct): string | null {
    if (!product.imageUrl) {
      return null;
    }

    const version = product.updatedAt ?? product.createdAt;

    if (!version) {
      return product.imageUrl;
    }

    const separator = product.imageUrl.includes('?') ? '&' : '?';
    return `${product.imageUrl}${separator}v=${encodeURIComponent(version)}`;
  }

  displayName(product: AdminProduct): string {
    return product.name?.trim() || `Producto #${product.id}`;
  }

  displayCategory(product: AdminProduct): string {
    return product.categoryName?.trim() || 'Sin categoria';
  }

  displayPrice(price: number | null): string {
    return price === null ? 'Consultar' : this.currencyFormatter.format(price);
  }

  displayStock(stock: number | null): string {
    return String(stock ?? 0);
  }

  displayImageStatus(product: AdminProduct): string {
    return product.imageUrl && !this.isBrokenImage(product.id) ? 'Imagen conectada' : 'Sin imagen';
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
      sku: rawValue.sku?.trim() || '',
      description: rawValue.description?.trim() || '',
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
        this.applyStoredImageUrl(product.imageUrl);
        this.toastService.show({
          title: selectedProductId === null ? 'Producto creado' : 'Producto actualizado',
          message: `El producto ${product.name} ya esta sincronizado con el panel admin.`,
        });
        this.loadData(true);
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

  private syncGeneratedSku(): void {
    if (this.isEditing()) {
      return;
    }

    this.form.patchValue(
      {
        sku: this.generateSkuPreview(this.form.controls.categoryId.value),
      },
      { emitEvent: false },
    );
  }

  private generateSkuPreview(categoryId: number | null): string {
    const nextSequence = this.products().reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1;
    const categoryName = this.categories().find((category) => category.id === categoryId)?.name ?? null;
    const categoryCode = this.resolveCategoryCode(categoryName);

    return `BSR-${categoryCode}-${String(nextSequence).padStart(4, '0')}`;
  }

  private resolveCategoryCode(categoryName: string | null): string {
    const normalizedCategory = (categoryName ?? '')
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toUpperCase();

    if (!normalizedCategory) {
      return 'GEN';
    }

    if (normalizedCategory.startsWith('WOM')) {
      return 'WOM';
    }
    if (normalizedCategory.startsWith('MEN') || normalizedCategory.startsWith('HOM')) {
      return 'MEN';
    }
    if (normalizedCategory.startsWith('KID') || normalizedCategory.startsWith('NIN') || normalizedCategory.startsWith('CHI')) {
      return 'KID';
    }
    if (normalizedCategory.startsWith('ACC') || normalizedCategory.startsWith('COM')) {
      return 'ACC';
    }

    return (normalizedCategory.replace(/\s+/g, '') + 'XXX').slice(0, 3);
  }
}
