import { Component, OnInit } from '@angular/core';
import { MenuModel } from 'src/app/models/menu';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuModel: MenuModel [] = [];
  username: string;

  constructor(private _serviceMenu: MenuService, private _serviceLogin: LoginService) { }

  ngOnInit(): void {
    this.cargarMenu();
    let token = sessionStorage.getItem('token');
    let claims = token.split('.')[1];
    let decodedClaims = JSON.parse(atob(claims));
    let authorities = decodedClaims.authorities;
    this.username = decodedClaims.username;
    console.log('layout username', this.username)
    console.log('layout', this.username);
  }

  cargarMenu() {
    let token = sessionStorage.getItem('token');
    let claims = token.split('.')[1];
    let decodedClaims = JSON.parse(atob(claims));
    console.log('claims', decodedClaims);
    this.username = decodedClaims.username;

    let hasAdminRole = false;

    JSON.parse(decodedClaims.authorities).forEach(element => {
      console.log('element', element);

      if (element.authority === 'ROLE_ADMIN') {
        hasAdminRole = true;
      }
    });

    if (hasAdminRole) {
      this.cargarMenuPorRol(1);
    } else {
      this.cargarMenuPorRol(2);
    }
  }

  cargarMenuPorRol(rol: number) {
    this._serviceMenu.listarMenuPorUsuario(this.username, rol).subscribe(data => {
      this.menuModel = data;
    });
  }

  cerrarSesion() {
    this._serviceLogin.cerrarSesion();
  }

}
