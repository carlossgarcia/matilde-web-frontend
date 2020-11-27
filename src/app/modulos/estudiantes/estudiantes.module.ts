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
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FaqComponent } from './pages/faq/faq.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { TemarioComponent } from './pages/temario/temario.component';

@NgModule({
  declarations: [EstudiantesComponent, AppComponent, SettingsComponent, HomeComponent, ProfileComponent,ContactoComponent, FaqComponent, QuienesSomosComponent, TemarioComponent],
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
