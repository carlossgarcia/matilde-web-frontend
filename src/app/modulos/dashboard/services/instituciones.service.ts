import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, retry } from 'rxjs/operators';
import { httpOptions } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  constructor(private http: HttpClient, public router: Router) { }

  GetAll() {
    return this.http.get(environment.url + '/instituciones/all', httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  Create(data: any) {
    return this.http.post(environment.url + '/instituciones/create', { institucion: data }, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }
}
