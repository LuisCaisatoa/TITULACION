import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { MenuModel } from '../models/menu';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const config ={
  headers: {
    //'Authorization': sessionStorage.getItem('Bearer token'),
    'Content-Type': 'application/json; charset=UTF-8',
  }
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  listarMenuPorUsuario(username:string, rol: number){
    return this.http.get<MenuModel[]>(`${environment.API_URL}/menu/${username}/${rol}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });
  }

}
