import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {

  showModal: EventEmitter<void> = new EventEmitter<void>();

  // Método para notificar la necesidad de mostrar el modal
  notifyShowModal() {
    this.showModal.emit();
  }

  constructor() { }
}
