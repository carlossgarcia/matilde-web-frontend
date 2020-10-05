import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EstudiantesComponent],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    SharedModule
  ]
})
export class EstudiantesModule { }
