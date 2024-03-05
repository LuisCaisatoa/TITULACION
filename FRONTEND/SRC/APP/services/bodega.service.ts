import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { BodegaModel } from '../models/bodega';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodegaService extends GenericService<BodegaModel>{

  bodegaCambio = new Subject<BodegaModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/bodegas`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getBodegaCambio() {
    return this.bodegaCambio.asObservable();
  }
  setBodegaCambio(bodega: BodegaModel[]) {
    this.bodegaCambio.next(bodega);
  }

}
