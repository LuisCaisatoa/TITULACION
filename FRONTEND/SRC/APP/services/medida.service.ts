import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MedidaModel } from '../models/medida';

@Injectable({
  providedIn: 'root',
})
export class MedidaService extends GenericService<MedidaModel>{
  medidaCambio = new Subject<MedidaModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
     super(_http, `${environment.API_URL}/medidas`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMedidaCambio() {
    return this.medidaCambio.asObservable();
  }
  setMedidaCambio(medida: MedidaModel[]) {
    this.medidaCambio.next(medida);
  }

}
