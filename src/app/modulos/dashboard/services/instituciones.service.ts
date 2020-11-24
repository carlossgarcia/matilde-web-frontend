import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { HTTP_GENERAL_HEADERS } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  headers = new HTTP_GENERAL_HEADERS();
  constructor(private http: HttpClient, public router: Router) { }

  GetAll() {
    return this.http.get(environment.url + '/instituciones/all', this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Paginado de instituciones por defecto el numero de instituciones a mostrar será de 10
   * @param options 
   */
  Paginate(options?: any): Observable<any[]> {
    return this.http.post(environment.url + '/instituciones/paginate', options, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  Create(data: any) {
    return this.http.post(environment.url + '/instituciones/create', { institucion: data }, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }
}
