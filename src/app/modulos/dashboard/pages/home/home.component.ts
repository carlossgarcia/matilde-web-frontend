import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/apexcharts/apexcharts.options';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(public estadisticasS: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasS.home().subscribe((r) => {
      this.chartOptions = {
        series: [
          {
            name: 'Registros',
            data: this.estadisticasS.estadisticasHome
              .formatUsuariosRegistradosPorFecha.series[0].data,
          },
        ],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Registros por fechas',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.estadisticasS.estadisticasHome
            .formatUsuariosRegistradosPorFecha.categorias,
        },
      };
    });
  }
}
