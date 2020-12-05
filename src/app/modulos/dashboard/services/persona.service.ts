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
export class PersonaService {

  headers = new HTTP_GENERAL_HEADERS();
  constructor(private http: HttpClient, public router: Router) { }

  /**
   * Información personal de la persona
   * @param options 
   */
  GetInfoPersona(options?: any): Observable<any[]> {
    return this.http.get(environment.url + '/persona/info-personal/' + options.userId, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }
}
