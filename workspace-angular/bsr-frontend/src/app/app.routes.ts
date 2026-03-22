import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Category } from './features/category/category';

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
    canActivate: [authGuard],
    loadComponent: () => import('./features/main/main').then((m) => m.Main),
  },
  {
    path: 'mujer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/shop-section/shop-section').then((m) => m.ShopSection),
    data: {
      title: 'Mujer',
      eyebrow: 'Coleccion',
      description:
        'Aqui podras montar la landing y el catalogo de mujer con el mismo lenguaje visual de la portada principal.',
    },
  },
  {
    path: 'hombre',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/shop-section/shop-section').then((m) => m.ShopSection),
    data: {
      title: 'Hombre',
      eyebrow: 'Coleccion',
      description:
        'Esta seccion queda lista para que conectes la propuesta de hombre, campanas destacadas y grid de producto.',
    },
  },
  {
    path: 'ninos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/shop-section/shop-section').then((m) => m.ShopSection),
    data: {
      title: 'Ninos',
      eyebrow: 'Coleccion',
      description:
        'La ruta de ninos ya esta lista para que construyas una pagina propia con productos, campanas y bloques editoriales.',
    },
  },
  {
    path: 'accesorios',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/shop-section/shop-section').then((m) => m.ShopSection),
    data: {
      title: 'Accesorios',
      eyebrow: 'Coleccion',
      description:
        'Aqui puedes montar la seccion de accesorios con banners, filtros y contenido promocional mas adelante.',
    },
  },
  { path: 'categorias', component: Category, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
