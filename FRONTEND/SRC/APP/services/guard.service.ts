import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private _loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //VERIFICAR SI ESTA LOGUEADO
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');

    if(!token){
      this._loginService.cerrarSesion();
      return false;
    }else{
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if(!isExpired){
        return true;
      }else{
        this._loginService.cerrarSesion();
        return false;
      }
    }
  }
}
