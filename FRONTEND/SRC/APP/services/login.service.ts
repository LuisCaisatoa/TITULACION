import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login';
import { Observable, tap } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=UTF-8'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: LoginModel = new LoginModel();
  private url: string = `${environment.API_LOGIN}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(login: Object){
    return this.http.post<any>(`${this.url}/login`, login, httpOptions).pipe(
      tap((res: any) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('message', res.message);
        sessionStorage.setItem('username', res.username);
      }

    ));
  }

  estaLogueado() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  //correos
  enviarCorreo(correo: string) {
    return this.http.post<number>(`${environment.API_URL}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  verificarTokenReset(token: string) {
    return this.http.get<number>(`${environment.API_URL}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post(`${environment.API_URL}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }
}
