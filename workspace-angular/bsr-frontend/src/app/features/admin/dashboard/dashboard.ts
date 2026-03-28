import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AdminDashboardData } from '../../../core/interfaces/admin.interface';
import { AdminService } from '../../../core/services/admin.service';

const EMPTY_DASHBOARD: AdminDashboardData = {
  productCount: 0,
  categoryCount: 0,
  customerCount: 0,
  orderCount: 0,
  adminCount: 0,
  activeCustomerCount: 0,
  pendingOrderCount: 0,
  lowStockCount: 0,
  revenueTotal: 0,
  recentOrders: [],
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './dashboard.html',
})
export class AdminDashboard {
  private readonly adminService = inject(AdminService);

  readonly dashboard = toSignal(this.adminService.getDashboard(), {
    initialValue: EMPTY_DASHBOARD,
  });

  readonly stats = computed(() => [
    {
      label: 'Productos',
      value: this.dashboard().productCount,
      note: 'Catalogo listo para la tienda',
    },
    {
      label: 'Categorias',
      value: this.dashboard().categoryCount,
      note: 'Secciones activas del menu',
    },
    {
      label: 'Clientes',
      value: this.dashboard().customerCount,
      note: 'Usuarios registrados',
    },
    {
      label: 'Pedidos',
      value: this.dashboard().orderCount,
      note: 'Pedidos recibidos',
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
}
