import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { RolModel } from 'src/app/models/rol';
import { UsuarioModel } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit {

  usuarioModel: UsuarioModel = new UsuarioModel();
  rolesArray: RolModel[] = [];

  constructor(
    private _dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
    private _service: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.usuarioModel = { ...this.data };
  }

  operar(){
    if(this.usuarioModel !== null && this.usuarioModel.id > 0){
      this._service.put(this.usuarioModel, this.usuarioModel.id).subscribe((data: UsuarioModel) => {
        this._service.getAll().subscribe((data: UsuarioModel[]) => {
          data[0].roles.forEach(element => {
            console.log(element.id);
            this._service.usuarioCambio.next(data);
            this._service.mensajeCambio.next('SE MODIFICO EL USUARIO');
          });

        });
      });
      this.cerrar();
    }else{
      console.log(this.usuarioModel);
      this._service.post(this.usuarioModel).pipe(switchMap(() => {
        return this._service.getAll();
      })).subscribe((data: UsuarioModel[]) => {
        console.log(data);
        this._service.usuarioCambio.next(data);
        this._service.mensajeCambio.next('SE REGISTRO EL USUARIO');
      });
    }
    this.cerrar();
  }

  enviarComoJSON() {
    const jsonRoles = JSON.stringify({ roles: this.usuarioModel.roles });
    console.log(jsonRoles);
  }

  cerrar(){
    this._dialogRef.close();
  }

}
