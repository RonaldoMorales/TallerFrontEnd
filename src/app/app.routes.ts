import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component'; // Import the LoginComponent

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect root path to /login
  { path: 'login', component: LoginComponent } // Route to LoginComponent
];
