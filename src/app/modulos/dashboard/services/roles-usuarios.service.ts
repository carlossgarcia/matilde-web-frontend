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
export class RolesUsuariosService {
  headers = new HTTP_GENERAL_HEADERS();
  constructor(private http: HttpClient, public router: Router) { }

  /**
   * Paginado de usuario por defecto el numero de usuarios a mostrar será de 10
   * @param options 
   */
  Paginate(options?: any): Observable<any[]> {
    return this.http.post(environment.url + '/usuarios/paginate', options, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Obtiene los roles del usuario en forma de arreglo
   * @param options
   * @returns {Array<ISegRolesUsuario>} 
   */
  GetUserRoles(options?: any): Observable<any[]> {
    return this.http.get(environment.url + '/roles/obtener/' + options.id, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Cambia el estatus del rol asignado al usuario
   * @param options 
   */
  ToggleUserRole(options?: any): Observable<any[]> {
    return this.http.put(environment.url + `/roles/toggle/${options.userId}/${options.roleId}`, {}, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Elimina un rol asignado al usuario
   * @param options 
   */
  DeleteUserRole(options?: any): Observable<any[]> {
    return this.http.delete(environment.url + `/roles/eliminar/${options.userId}/${options.roleId}`, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
   * Obtiene todos los roles del sistema.
   * @param options
   * @returns {Array<ISegRolesUsuario>} 
   */
  GetRoles(options?: any): Observable<any[]> {
    return this.http.get(environment.url + '/roles/obtener/todos', this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

  /**
 * Agrega un rol al usuario activo
 * @param options
 * @returns {Array<ISegRolesUsuario>} 
 */
  AddRole(options?: any): Observable<any[]> {
    return this.http.post(environment.url + '/roles/agregar/', options, this.headers.httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      retry(1)
    );
  }

}
