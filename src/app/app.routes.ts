import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path:'',
  loadComponent: () => import('./features/home/home').then(m => m.Home
  )
},
{
  path: 'countries/:cca3',
  loadComponent: () => import('./features/detail/detail').then(m => m.Detail)
},
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}
];
