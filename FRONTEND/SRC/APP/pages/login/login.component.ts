import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import '../../../assets/login-animation.js';
import { LoginModel } from 'src/app/models/login';
import { FormBuilder, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        TransformStream: 'translateX(30px)',
        opacity: 0
      })),
      transition(':enter', [
        animate(300, style({
          TransformStream: 'translateX(0px)',
          opacity: 2
        }))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  mensaje: string;
  error: string;
  usuario: LoginModel = new LoginModel();

  constructor(
    private _router: Router, private _fb: FormBuilder, private service: LoginService
  ) { }

  ngOnInit(): void {
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
        this._router.navigateByUrl("pages/inicio");
      },
      error: error => {
        this.error = error;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario o la contraseña son incorrectos, revise sus credenciales",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.error('There was an error!', error);
      }
    });
  }

  // ngAfterViewInit() {
  //   (window as any).initialize();
  // }

}
