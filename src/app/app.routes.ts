import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';

export const routes: Routes = [
  { path: '', title: 'home', component: HomeComponent },
  { path: 'country/:id', title: 'country', component: CountryComponent },
  { path: '**', redirectTo: '' },
];
