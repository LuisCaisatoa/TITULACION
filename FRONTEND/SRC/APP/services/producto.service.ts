import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ProductoModel } from '../models/producto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<ProductoModel>{

  productoCambio = new Subject<ProductoModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
     super(_http, `${environment.API_URL}/productos`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getProductoCambio() {
    return this.productoCambio.asObservable();
  }
  setProductoCambio(producto: ProductoModel[]) {
    this.productoCambio.next(producto);
  }
}
