import { Injectable } from '@angular/core';
import { PrestamoModel } from '../models/prestamo';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService extends GenericService<PrestamoModel>{

  prestamoCambio = new Subject<PrestamoModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/prestamos`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getPrestamoCambio() {
    return this.prestamoCambio.asObservable();
  }
  setPrestamoCambio(prestamo: PrestamoModel[]) {
    this.prestamoCambio.next(prestamo);
  }


}
