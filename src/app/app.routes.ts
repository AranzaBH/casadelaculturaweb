import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', loadComponent: () => import('./usuario-list/usuario-list.component')
    },
    {
        path:'crearUsuario', loadComponent: () => import('./usuario-form/usuario-form.component')
    }
];
