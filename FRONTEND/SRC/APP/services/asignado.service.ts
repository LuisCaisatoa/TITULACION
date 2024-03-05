import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { AsignadoModel } from '../models/asignado';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignadoService extends GenericService<AsignadoModel>{

  asignadoCambio = new Subject<AsignadoModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/asignados`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getAsignadoCambio() {
    return this.asignadoCambio.asObservable();
  }
  setAsignadoCambio(asignado: AsignadoModel[]) {
    this.asignadoCambio.next(asignado);
  }

}
