import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public estadisticasS: EstadisticasService) { }

  ngOnInit(): void {
    this.estadisticasS.home().subscribe(r => { console.log(r) });
  }

}
