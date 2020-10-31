import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { HTTP_GENERAL_HEADERS } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaEstudianteService {
  headers = new HTTP_GENERAL_HEADERS();
  constructor(public http: HttpClient) { }

  UpdatePersonaInfo({ nombre, apellidoPaterno, apellidoMaterno }) {
    const data = {
      nombre, apellidoPaterno, apellidoMaterno
    };
    return this.http.put(environment.url + '/persona/update', { persona: data }, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

}
