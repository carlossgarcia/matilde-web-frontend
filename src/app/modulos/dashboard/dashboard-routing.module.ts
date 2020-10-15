import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { InstitucionesComponent } from './pages/instituciones/instituciones.component';
import { LicenciasComponent } from './pages/licencias/licencias.component';
import { AllComponent } from './pages/usuarios/steps/all/all.component';
import { RolesComponent } from './pages/usuarios/steps/roles/roles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        children: [
          {
            path: 'all',
            component: AllComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: '',
            redirectTo: '/dashboard/usuarios/all'
          }
        ]
      },
      {
        path: 'instituciones',
        component: InstitucionesComponent
      },
      {
        path: 'licencias',
        component: LicenciasComponent
      },
      {
        path: '',
        redirectTo: '/dashboard/home'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting { }
