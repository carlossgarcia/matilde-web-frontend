import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, retry } from 'rxjs/operators';
import { HTTP_GENERAL_HEADERS } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  estadisticasHome: any = {};

  headers = new HTTP_GENERAL_HEADERS();
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Retorna la respuesta HTTP y tambien la asigna a la propiedad @property {estadisticasHome}
   * @returns
   */
  home() {
    return this.http
      .get(environment.url + '/estadisticas/home', this.headers.httpOptions)
      .pipe(
        map((res: any) => {
          this.estadisticasHome = res;
          return res;
        }),
        retry(1)
      );
  }
}
