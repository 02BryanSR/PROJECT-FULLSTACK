export const routes = [
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
        loadComponent: () => import('./features/forgot-password/forgot-password').then((m) => m.ForgotPassword),
    },
    {
        path: 'home',
        loadComponent: () => import('./features/main/main').then((m) => m.Main),
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];
