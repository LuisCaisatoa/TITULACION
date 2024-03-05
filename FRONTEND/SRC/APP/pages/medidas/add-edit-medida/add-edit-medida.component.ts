import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MedidaModel } from 'src/app/models/medida';
import { MedidaService } from 'src/app/services/medida.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-medida',
  templateUrl: './add-edit-medida.component.html',
  styleUrls: ['./add-edit-medida.component.scss']
})
export class AddEditMedidaComponent {

  // form: FormGroup;
  // idMedida: number;
  // edicion: boolean;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private _service: MedidaService
  // ) { }

  // ngOnInit(): void {
  //   this.form = new FormGroup({
  //     'idMedida': new FormControl(0),
  //     'nombre': new FormControl('')
  //   });

  //   this.route.params.subscribe(data => {
  //     this.idMedida = data['id'];
  //     this.edicion = data['id'] != null;
  //     this.initForm();
  //   });
  // }



  // initForm() {
  //   if (this.edicion) {
  //     this._service.getMedidaById(this.idMedida).subscribe(data => {
  //       this.form = new FormGroup({
  //         'idMedida': new FormControl(data.idMedida),
  //         'nombre': new FormControl(data.nombre)
  //       });
  //     });
  //   }
  // }

  // operar() {
  //   let medida = new MedidaModel();
  //   medida.idMedida = this.form.value['idMedida'];
  //   medida.nombre = this.form.value['nombre'];

  //   if (this.edicion) {
  //     //MODIFICAR
  //     //PRACTICA COMUN, NO IDEAL
  //     this._service.putMedidas(medida).subscribe( () => {
  //       this._service.getMedidas().subscribe(data => {
  //         this._service.setMedidaCambio(data);
  //         this._service.setMensajeCambio('La medida se ha modificado');
  //       });
  //     });
  //   } else {
  //     //REGISTRAR
  //     //PRACTICA IDEAL, OPERADORES REACTIVOS op switchMap
  //     this._service.postMedias(medida).pipe(switchMap( () => {
  //       return this._service.getMedidas();
  //     })).subscribe(data => {
  //       this._service.setMedidaCambio(data);
  //       this._service.setMensajeCambio('La medida se ha registrado');
  //     });
  //   }
  //   this.router.navigate(['/pages/medidas']);

  // }

}
