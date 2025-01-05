// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './security/guard/auth.guard';
import { Error404Component } from './paginas/error404/error404.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'principal', 
    canActivate: [AuthGuard],
    loadComponent: () => import('./paginas/principal/principal.component').then(m => m.PrincipalComponent)
  },
  { path: '404', component: Error404Component},
  { path: '**', redirectTo: '/404' } // Esta ruta captura cualquier URL no definida y redirige a 404
];