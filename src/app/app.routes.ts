import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/country-list/country-list').then(m => m.CountryList)
    },
    {
        path: 'details/:code',
        loadComponent: () => import('./pages/country-detail/country-detail').then(m => m.CountryDetail)
    },
    {
        path: 'saiba-mais',
        loadComponent: () => import('./pages/saiba-mais/saiba-mais').then(m => m.SaibaMais)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
    },
    {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
    }

];
