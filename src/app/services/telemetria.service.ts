import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTP_GENERAL_HEADERS } from '../classes/headers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TelemetriaService {

  TelemetriaActual = null;
  headers = new HTTP_GENERAL_HEADERS();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // API CALLS
  Inicio() {
    const usuario = this.auth.UserClass;
    this.http.post(environment.url + '/telemetria/start-app-unity', {
      cveUsuario: usuario.data.UserCopy.cveUsuario
    }, this.headers.httpOptions).subscribe(r => this.TelemetriaActual = r)
  }

  Final() {
    console.log(this.TelemetriaActual);
    this.http.post(environment.url + '/telemetria/finish-app-unity', {
      idTelem: this.TelemetriaActual.id
    }, this.headers.httpOptions).subscribe(r => console.log);

  }
}
