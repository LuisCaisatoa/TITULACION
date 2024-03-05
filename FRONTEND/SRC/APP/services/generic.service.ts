import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const config ={
  headers: {
    'Authorization': sessionStorage.getItem('token'),
    'Content-Type': 'application/json; charset=UTF-8'
  }
}


@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected _http: HttpClient, @Inject("url") protected _url: string ) { }

  getAll(){
    return this._http.get<T[]>(`${this._url}`, config);
  }

  getById(id: number){
    return this._http.get<T>(`${this._url}/${id}`, config);
  }

  post(obj: T){
    return this._http.post(`${this._url}`, obj, config);
  }

  postInventario(obj: T, idBodega : number, idProducto : number){
    return this._http.post(`${this._url}/bodega/${idBodega}/producto/${idProducto}`, obj, config);
  }

  put(obj: T, id: number){
    return this._http.put(`${this._url}/${id}`, obj, config);
  }

  putProducto(obj: T, id: number){
    return this._http.put(`${this._url}/${id}`, obj , config);
  }

  delete(id: number){
    return this._http.delete(`${this._url}/${id}`, config);
  }

  getPdf(idBodega: number, idProducto: number): Observable<Blob> {
    const url = `${this._url}/entrega-recepcion/${idBodega}/${idProducto}`;

    // Configura las cabeceras para aceptar application/pdf
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });

    return this._http.get(url, { responseType: 'blob', headers });
  }


  // getByUserNameMenu(username: string){
  //   return this._http.get<T[]>(`${this._url}/${username}`, config);
  // }

}
