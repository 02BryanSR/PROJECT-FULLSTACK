import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Main } from './features/main/main';
import { Category } from './features/category/category';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'main', component: Main },
  { path: 'categorias', component: Category },
  { path: '**', redirectTo: 'login' },
];
