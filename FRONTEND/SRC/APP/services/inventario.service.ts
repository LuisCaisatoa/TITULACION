import { Injectable } from '@angular/core';
import { InventarioModel } from '../models/inventario';
import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService extends GenericService<InventarioModel>{

  inventarioCambio = new Subject<InventarioModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/inventarios`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getInventarioCambio() {
    return this.inventarioCambio.asObservable();
  }
  setInventarioCambio(inventario: InventarioModel[]) {
    this.inventarioCambio.next(inventario);
  }
}
