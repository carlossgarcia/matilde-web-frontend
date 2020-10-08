import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { httpOptions } from '../classes/headers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtS = new JwtHelperService();

  isLoggedIn = false;
  UserData: any;
  Token: string;

  constructor(private http: HttpClient, public router: Router) {
    this.LoadAuthInformation();
  }

  Login(data: any) {
    return this.http.post('http://localhost:3001/auth/login', data, httpOptions).pipe(
      map((res: any) => {
        if (res.error) {
          return res;
        } else {
          this.Token = res.data.token;
          this.UserData = this.jwtS.decodeToken(res.data.token);
          this.SaveAuthInformation();
          return res;
        }
      }),
      retry(1)
    );

  }

  Signup(data: any) {
    return this.http.post('http://localhost:3001/auth/signup', data, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  VerifyPersonPreRegistration(data: any) {
    return this.http.post('http://localhost:3001/auth/verify/person-reg', data, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  CompleteRegister(data: any) {
    return this.http.post('http://localhost:3001/auth/person-reg', data, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Por mientras guardaremos el token en el localStorage, luego lo cambiaremos a indexeddb a traves de lovefield
   */
  SaveAuthInformation(): void {
    localStorage.setItem('token', this.Token);
    localStorage.setItem('user', JSON.stringify(this.UserData));
  }

  /**
   * Se borra toda la info de la sesión
   */
  DestroySessionInformation(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.UserData = null;
    this.Token = null;
    location.reload();
  }

  /**
   * Cargar la info primero
   */
  LoadAuthInformation(): void {
    console.log('Obteniendo información...');
    if (localStorage.getItem('token')) {
      console.log('Información obtenida... Validando');
      this.isLoggedIn = true;
      this.Token = localStorage.getItem('token');
      this.UserData = JSON.parse(localStorage.getItem('user'));
      this.ValidateToken();
    } else {
      console.log('No hay información');

    }
  }

  /**
   * Validamos que el token esté vigente
   */
  ValidateToken(): void {
    const obs = this.http.post('http://localhost:3001/auth/validate-token', { token: this.Token }, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
    const subs = obs.subscribe(result => {
      this.isLoggedIn = result.data.isValid;
      subs.unsubscribe();
    });
  }
}
