import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { httpOptions } from '../classes/headers';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  Login(data: any): Observable<any> {
    return this.http.post('http://localhost:3001/login', data, httpOptions);
  }

}
