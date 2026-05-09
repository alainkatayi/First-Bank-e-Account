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
        path: 'request-details/:id',
        title: 'Request Details',
        loadComponent: () => import('./pages/request-detail/request-detail.component').then(m => m.RequestDetailComponent)
    },
    {
        path: 'admin/layout',
        title: 'Layout',
        loadComponent: () => import('./pages/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent)
    },
    {
        path: 'admin/user',
        title: 'User',
        loadComponent: () => import('./pages/user-list/user-list.component').then(m => m.UserListComponent)
    },
];
