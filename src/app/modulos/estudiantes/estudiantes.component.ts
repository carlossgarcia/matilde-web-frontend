import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from '../../services/utilidades.service';
declare var $: any;
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  constructor(public authS: AuthService, public utilidadesS: UtilidadesService) { }

  ngOnInit(): void {
    this.OpenSideBar();
  }
  
  socialBar(url){
    window.open(url, '_blank');
  }

  OpenSideBar(): void {
    $('#sidebarCollapse').on('click', () => {
      $('#sidebar').toggleClass('active');
      $('#body').toggleClass('active');
    });
  }

}
