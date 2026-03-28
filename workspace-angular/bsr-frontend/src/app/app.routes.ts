import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register').then((m) => m.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/main/main').then((m) => m.Main),
  },
  {
    path: 'women',
    loadComponent: () => import('./features/women/women').then((m) => m.Women),
  },
  {
    path: 'men',
    loadComponent: () => import('./features/men/men').then((m) => m.Men),
  },
  {
    path: 'kids',
    loadComponent: () => import('./features/kids/kids').then((m) => m.Kids),
  },
  {
    path: 'accessories',
    loadComponent: () =>
      import('./features/accessories/accessories').then((m) => m.Accessories),
  },
  { path: 'mujer', redirectTo: 'women', pathMatch: 'full' },
  { path: 'hombre', redirectTo: 'men', pathMatch: 'full' },
  { path: 'ninos', redirectTo: 'kids', pathMatch: 'full' },
  { path: 'accesorios', redirectTo: 'accessories', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
