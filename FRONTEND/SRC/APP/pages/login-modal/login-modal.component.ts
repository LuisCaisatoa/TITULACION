import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  username: string;
  password: string;
  mensaje: string;
  error: string;
  usuario: LoginModel = new LoginModel();

  constructor(
    private _router: Router, private _fb: FormBuilder, private service: LoginService, private _dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginModel,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.usuario = { ...this.data };
  }

  cerrar(){
    this._dialogRef.close();
  }

  // iniciarSesion(){
  //   this.loginService.login(this.usuario);
  // }

  public loginForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  iniciarSesion(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe({
      next: data => {
        console.log(data);
        const claims = data.token.split('.')[1];
        const decodedClaims = JSON.parse(atob(claims));
        console.log({decodedClaims});
        sessionStorage.setItem('token', `Bearer ${data.token}`);
        //this._router.navigateByUrl("pages/inicio");
      },
      error: error => {
        this.error = error;
        console.error('There was an error!', error);
      }
    });
  }

  // ngAfterViewInit() {
  //   (window as any).initialize();
  // }


}
