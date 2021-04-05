import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { InstitucionesComponent } from './pages/instituciones/instituciones.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LicenciasComponent } from './pages/licencias/licencias.component';
import { RolesComponent } from './pages/usuarios/steps/roles/roles.component';
import { AllComponent } from './pages/usuarios/steps/all/all.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    InstitucionesComponent,
    UsuariosComponent,
    LicenciasComponent,
    RolesComponent,
    AllComponent,
  ],
  imports: [
    CommonModule,
    DashboardRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
