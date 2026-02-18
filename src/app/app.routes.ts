import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Welcome } from './pages/welcome/welcome';
import { Logout } from './pages/logout/logout';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: Welcome },
  { path: 'logout', component: Logout },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
