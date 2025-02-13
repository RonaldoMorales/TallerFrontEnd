// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './security/guard/auth.guard';
import { Error404Component } from './paginas/error404/error404.component';
import { RegistrarUsuarioComponent } from './paginas/registrar-usuario/registrar-usuario.component';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./product/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'addProduct',
    pathMatch: 'full',
    loadComponent: () => import('./product/pages/add-product/add-product.component').then(m => m.AddProductComponent)
  },
  {
    path: 'verCarro',
    pathMatch: 'full',
    loadComponent: () => import('./sale/pages/ver-carro/ver-carro.component').then(m => m.VerCarroComponent)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'principal',
    canActivate: [AuthGuard],
    loadComponent: () => import('./paginas/principal/principal.component').then(m => m.PrincipalComponent)
  },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: '404', component: Error404Component},
  { path: '**', redirectTo: '/404' } // Esta ruta captura cualquier URL no definida y redirige a 404
];
