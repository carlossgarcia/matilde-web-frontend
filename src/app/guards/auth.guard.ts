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
    console.log(this.authService.isLoggedIn);
    
    if (this.authService.isLoggedIn === false) {
      this.router.navigateByUrl('/signup');
      return false;
    } else {
      console.log(route.url.join(''));

      switch (route.url.join('')) {
        case 'estudiantes':
          return true;
          break;
        case 'dashboard':
          if(this.authService.UserData.UserCopy.roles.map(r => r.rol.nombre).includes('administrador')){
            return true;
          }else{
            this.router.navigateByUrl('/login');
            return false;
          }
          break;
        case 'app':
          return true;
          break;
        default:
          this.router.navigateByUrl('/login');
          return false;
          break;
      }
      
    }
  }
}
