import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AdminDashboardData } from '../../../core/interfaces/admin.interface';
import { AdminService } from '../../../core/services/admin.service';

const EMPTY_DASHBOARD: AdminDashboardData = {
  productCount: 0,
  categoryCount: 0,
  customerCount: 0,
  orderCount: 0,
  salesToday: 0,
  salesMonth: 0,
  salesPreviousMonth: 0,
  salesMonthDelta: 0,
  adminCount: 0,
  activeCustomerCount: 0,
  pendingOrderCount: 0,
  lowStockCount: 0,
  revenueTotal: 0,
  recentProducts: [],
  recentOrders: [],
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.html',
})
export class AdminDashboard {
  private readonly adminService = inject(AdminService);
  private readonly currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  });
  readonly brokenImageIds = signal<readonly number[]>([]);

  readonly dashboard = toSignal(this.adminService.getDashboard(), {
    initialValue: EMPTY_DASHBOARD,
  });

  readonly stats = computed(() => [
    {
      label: 'Productos',
      value: this.dashboard().productCount,
      displayValue: String(this.dashboard().productCount),
      note: 'Catalogo listo para la tienda',
      tone: 'neutral' as const,
    },
    {
      label: 'Categorias',
      value: this.dashboard().categoryCount,
      displayValue: String(this.dashboard().categoryCount),
      note: 'Secciones activas del menu',
      tone: 'neutral' as const,
    },
    {
      label: 'Clientes',
      value: this.dashboard().customerCount,
      displayValue: String(this.dashboard().customerCount),
      note: 'Usuarios registrados',
      tone: 'neutral' as const,
    },
    {
      label: 'Pedidos',
      value: this.dashboard().orderCount,
      displayValue: String(this.dashboard().orderCount),
      note: 'Pedidos recibidos',
      tone: 'neutral' as const,
    },
    {
      label: 'Compras hoy',
      value: this.dashboard().salesToday,
      displayValue: this.formatCurrency(this.dashboard().salesToday),
      note: 'Total generado hoy',
      tone: 'neutral' as const,
    },
    {
      label: 'Compras mes',
      value: this.dashboard().salesMonth,
      displayValue: this.formatCurrency(this.dashboard().salesMonth),
      note: 'Acumulado del mes actual',
      tone: 'neutral' as const,
    },
    {
      label: 'Mes anterior',
      value: this.dashboard().salesPreviousMonth,
      displayValue: this.formatCurrency(this.dashboard().salesPreviousMonth),
      note: 'Total cerrado del mes anterior',
      tone: 'neutral' as const,
    },
    {
      label: 'Variacion mensual',
      value: this.dashboard().salesMonthDelta,
      displayValue: this.formatDelta(this.dashboard().salesMonthDelta),
      note: this.getMonthDeltaNote(this.dashboard().salesMonthDelta),
      tone: this.getMonthDeltaTone(this.dashboard().salesMonthDelta),
    },
  ]);

  readonly quickLinks = [
    {
      title: 'Gestionar productos',
      note: 'Crear, editar stock y cargar imagenes',
      route: '/admin/products',
    },
    {
      title: 'Gestionar categorias',
      note: 'Ordenar la navegacion y el catalogo',
      route: '/admin/categories',
    },
    {
      title: 'Gestionar clientes',
      note: 'Crear usuarios y activar o desactivar cuentas',
      route: '/admin/customers',
    },
    {
      title: 'Gestionar pedidos',
      note: 'Revisar estados y avance de compra',
      route: '/admin/orders',
    },
  ] as const;

  isBrokenImage(productId: number): boolean {
    return this.brokenImageIds().includes(productId);
  }

  markImageAsBroken(productId: number): void {
    if (this.brokenImageIds().includes(productId)) {
      return;
    }

    this.brokenImageIds.update((ids) => [...ids, productId]);
  }

  imageSrc(imageUrl: string | null, version: string | null): string | null {
    if (!imageUrl) {
      return null;
    }

    if (!version) {
      return imageUrl;
    }

    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}v=${encodeURIComponent(version)}`;
  }

  displayProductName(name: string | null, id: number): string {
    return name?.trim() || `Producto #${id}`;
  }

  displayCategory(name: string | null): string {
    return name?.trim() || 'Sin categoria';
  }

  displayPrice(value: number | null): string {
    return value === null ? 'Consultar' : this.currencyFormatter.format(value);
  }

  displayStock(value: number | null): string {
    return String(value ?? 0);
  }

  displayImageStatus(imageUrl: string | null, productId: number): string {
    return imageUrl && !this.isBrokenImage(productId) ? 'Imagen conectada' : 'Sin imagen';
  }

  getMonthDeltaTone(value: number): 'positive' | 'negative' | 'neutral' {
    if (value > 0) {
      return 'positive';
    }

    if (value < 0) {
      return 'negative';
    }

    return 'neutral';
  }

  private getMonthDeltaNote(value: number): string {
    if (value > 0) {
      return 'Positivo frente al mes anterior';
    }

    if (value < 0) {
      return 'Negativo frente al mes anterior';
    }

    return 'Sin variacion frente al mes anterior';
  }

  private formatCurrency(value: number): string {
    return this.currencyFormatter.format(value);
  }

  private formatDelta(value: number): string {
    if (value > 0) {
      return `+${this.formatCurrency(value)}`;
    }

    if (value < 0) {
      return `-${this.formatCurrency(Math.abs(value))}`;
    }

    return this.formatCurrency(0);
  }
}
