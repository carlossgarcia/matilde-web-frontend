import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/modulos/dashboard/services/usuarios.service';

type MODAL_TYPE = 'roles' | 'datospersonales' | 'borrar';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  SELECTED_MODAL: MODAL_TYPE;
  SELECTED_USER: number;
  ROLES: any = {};
  PERSONAL_DATA: any = {};

  constructor(public UsuariosServ: UsuariosService) { }

  ngOnInit(): void {
    this.InitData();
  }
  // Infinite scroller
  throttle = 200;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  // Esto solo si no se modifica el tamaño a tomar
  PREVIUS_SKIP = 0;
  DEFAULT_TAKE_AMOUNT = 10;
  TOTAL_AMOUNT = 0;

  USUARIOS: any[];

  search(event: KeyboardEvent, text: string) {
    console.log(event.key);

    if (event.key === 'Enter') {
      const subs = this.UsuariosServ.Paginate({ searchParams: { nombre: text, siglas: text } }).subscribe(r => {
        this.USUARIOS = r[0];
        subs.unsubscribe();
      });
    }
  }

  onScrollDown() {
    console.log('scrolling down');

    const subs = this.UsuariosServ.Paginate({ skip: this.PREVIUS_SKIP += this.DEFAULT_TAKE_AMOUNT }).subscribe(r => {
      this.USUARIOS = this.USUARIOS.concat(r[0]);
      subs.unsubscribe();
    });
    this.direction = 'down';
  }

  InitData() {
    const subs = this.UsuariosServ.Paginate().subscribe(r => {
      this.USUARIOS = r[0];
      this.TOTAL_AMOUNT = r[1];
      console.log(this.USUARIOS);

      subs.unsubscribe();
    });
  }

  selectModal(type: MODAL_TYPE, cveUsuario: number) {
    this.SELECTED_MODAL = type;
    this.SELECTED_USER = cveUsuario;
    console.log(this.SELECTED_MODAL, this.SELECTED_USER);
    this.actions();
  }

  actions() {
    switch (this.SELECTED_MODAL) {
      case 'roles':
        const subs = this.UsuariosServ.GetUserRoles({ id: this.SELECTED_USER }).subscribe(r => {
          this.ROLES = r;
          console.log(this.ROLES);

          subs.unsubscribe();
        })
        break;
      case 'datospersonales':

        break;
      case 'borrar':

        break;

      default:
        break;
    }
  }

}
