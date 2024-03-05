import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<UsuarioModel>{

  usuarioCambio = new Subject<UsuarioModel[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API_URL}/usuarios`);
  }

  // GETTERS AND SETTERS

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getUsuarioCambio() {
    return this.usuarioCambio.asObservable();
  }
  setUsuarioCambio(usuario: UsuarioModel[]) {
    this.usuarioCambio.next(usuario);
  }
}
