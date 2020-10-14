import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**
     * TODO Definir la manera de gestionar los roles.
     * El sistema de gestión de rutas aún no está del todo definido.
     * En la proxima versión se ahondará más en ello.
     */
    if (this.authService.isLoggedIn === false) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      console.log(route.url.join(''));
      if (route.url.join('') === 'estudiantes') {
        return true;
      } else {
        if (route.url.join('') === 'dashboard' && this.authService.UserData.UserCopy.roles.map(r => r.nombre).includes('administrador')) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      }
    }
  }
}
