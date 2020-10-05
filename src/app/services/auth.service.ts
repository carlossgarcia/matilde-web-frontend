import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { httpOptions } from '../classes/headers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;

  constructor(private http: HttpClient) { }

  Login(data: any) {
    return this.http.post('http://localhost:3001/auth/login', data, httpOptions).pipe(
      map((res: any) => {
        //SI HUBO UN ERROR
        // console.log("Respuesta del servidor ", res);
        return res;
      }),
      retry(1)
    );

  }

  Signup(data: any) {
    return this.http.post('http://localhost:3001/auth/signup', data, httpOptions).pipe(
      map((res: any) => {
        //SI HUBO UN ERROR
        // console.log("Respuesta del servidor ", res);
        return res;
      }),
      retry(1)
    );
  }

  VerifyPersonPreRegistration(data: any) {
    return this.http.post('http://localhost:3001/auth/verify/person-reg', data, httpOptions).pipe(
      map((res: any) => {
        //SI HUBO UN ERROR
        // console.log("Respuesta del servidor ", res);
        return res;
      }),
      retry(1)
    );
  }

  CompleteRegister(data: any) {
    return this.http.post('http://localhost:3001/auth/person-reg', data, httpOptions).pipe(
      map((res: any) => {
        //SI HUBO UN ERROR
        // console.log("Respuesta del servidor ", res);
        return res;
      }),
      retry(1)
    );
  }

}
