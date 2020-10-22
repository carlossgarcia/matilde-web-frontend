import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './pages/app/app.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilidadesService } from '../../services/utilidades.service';


@NgModule({
  declarations: [EstudiantesComponent, AppComponent, SettingsComponent, HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    UtilidadesService
  ]
})
export class EstudiantesModule { }
