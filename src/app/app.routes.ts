import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'country/:id', title: 'country', loadComponent: () => import('./pages/country/country.component').then(m => m.CountryComponent) },
  { path: '**', redirectTo: '' },
];
