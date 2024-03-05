import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { CategoriaModel } from '../models/categoria';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<CategoriaModel>{

  categoriaCambio = new Subject<CategoriaModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/categorias`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getCategoriaCambio() {
    return this.categoriaCambio.asObservable();
  }
  setCategoriaCambio(categoria: CategoriaModel[]) {
    this.categoriaCambio.next(categoria);
  }
}
