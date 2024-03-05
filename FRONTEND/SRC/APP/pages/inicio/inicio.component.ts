import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { single } from 'src/app/models/data';
import { MenuModel } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  menuModel: MenuModel [] = [];
  username: string = '';
  constructor(private _serviceMenu: MenuService) {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token');
    let claims = token.split('.')[1];
    let decodedClaims = JSON.parse(atob(claims));
    let authorities = decodedClaims.authorities;
    this.username = decodedClaims.username;
    let isAdmin = authorities.includes('ROLE_ADMIN');
    console.log('username', this.username);
    //this.listarMenuPorUsuario();
  }

  // listarMenuPorUsuario(){
  //   this._serviceMenu.listarMenuPorUsuario(this.username, 1).subscribe(data => {
  //     this.menuModel = data;
  //   });
  //  };

   single: any[];
   view: [any, any] | [number, number] = [700, 400];

   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   isDoughnut: boolean = false;



   onSelect(data): void {
     console.log('Item clicked', JSON.parse(JSON.stringify(data)));
   }

   onActivate(data): void {
     console.log('Activate', JSON.parse(JSON.stringify(data)));
   }

   onDeactivate(data): void {
     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
   }
}
