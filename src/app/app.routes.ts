import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'request',
        title: 'Request',
        loadComponent: () => import('./pages/requests-list/requests-list.component').then(m => m.RequestsListComponent)
    },
    {
        path: 'admin/layout',
        title: 'Layout',
        loadComponent: () => import('./pages/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent)
    },
];
