import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { httpOptions } from 'src/app/classes/headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaEstudianteService {

  constructor(public http: HttpClient) { }

  UpdatePersonaInfo(data) {
    return this.http.put(environment.url + '/persona/update', { persona: data }, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

}
