import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { HTTP_GENERAL_HEADERS } from '../classes/headers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ILocalStorageSegCatUsuario } from '../classes/core';
import { User } from '../classes/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtS = new JwtHelperService();

  isLoggedIn = false;
  UserData: ILocalStorageSegCatUsuario;
  UserClass: User;
  Token: string;
  headers = new HTTP_GENERAL_HEADERS();

  constructor(private http: HttpClient, public router: Router) {
    this.LoadAuthInformation();
  }

  Login(data: any) {
    return this.http.post(environment.url + '/auth/login', data, this.headers.httpOptions).pipe(
      map((res: any) => {
        if (res.error) {
          return res;
        } else {
          this.Token = res.data.token;
          this.headers.Token(res.data.token);
          this.UserData = this.jwtS.decodeToken(res.data.token);
          this.UserClass = new User(this.UserData);
          this.SaveAuthInformation();
          return res;
        }
      }),
      retry(1)
    );

  }

  Signup(data: any) {
    return this.http.post(environment.url + '/auth/signup', data, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  VerifyPersonPreRegistration(data: any) {
    return this.http.post(environment.url + '/auth/verify/person-reg', data, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  CompleteRegister(data: any) {
    return this.http.post(environment.url + '/auth/person-reg', data, this.headers.httpOptions).pipe(
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
      this.UserClass = new User(this.UserData);
      this.ValidateToken();
    } else {
      console.log('No hay información');

    }
  }

  /**
   * Validamos que el token esté vigente
   */
  ValidateToken(): void {
    const obs = this.http.post(environment.url + '/auth/validate-token', { token: this.Token }, this.headers.httpOptions).pipe(
      map((res: any) => {
        console.log('Hola => ', res);

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
