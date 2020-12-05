import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/modulos/dashboard/services/persona.service';
import { RolesUsuariosService } from 'src/app/modulos/dashboard/services/roles-usuarios.service';
import { UsuarioAdminService } from 'src/app/modulos/dashboard/services/usuario-admin.service';

type MODAL_TYPE = 'roles' | 'datospersonales' | 'borrar';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  /**
   * VARIABLES MODAL
   */
  SELECTED_MODAL: MODAL_TYPE;
  SELECTED_USER: number;
  ROLES: any = [];
  PERSONAL_DATA: any = {};
  ROLES_CATALOG = [];
  SELECTED_USER_TO_ERASE: any = {};

  constructor(public UsuariosServ: RolesUsuariosService,
    public PersonaServ: PersonaService,
    public UsuarioAdminServ: UsuarioAdminService) { }

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
    // console.log(event.key);

    if (event.key === 'Enter') {
      const subs = this.UsuariosServ.Paginate({ searchParams: { nombre: text, siglas: text } }).subscribe(r => {
        this.USUARIOS = r[0];
        subs.unsubscribe();
      });
    }
  }

  onScrollDown() {
    // console.log('scrolling down');

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
      this.UsuariosServ.GetRoles().subscribe(r => this.ROLES_CATALOG = r);
      subs.unsubscribe();
    });
  }

  selectModal(type: MODAL_TYPE, cveUsuario: number) {
    this.SELECTED_MODAL = type;
    this.SELECTED_USER = cveUsuario;
    // console.log(this.SELECTED_MODAL, this.SELECTED_USER);
    this.actions();
  }

  /**
   * Cambio el valor de la propiedad activo de un rol
   * @param roleId 
   */
  toggleRole(roleId: number) {
    // console.log(this.SELECTED_USER, roleId);
    const subs = this.UsuariosServ.ToggleUserRole({ userId: this.SELECTED_USER, roleId: roleId }).subscribe(r => {
      if (Array.isArray(r)) {
        this.ROLES = r;
      } else {
        console.error(r);
      }
      subs.unsubscribe();
    })
  }

  /**
   * Elimina un rol
   * @param roleId 
   */
  deleteRole(roleId: number) {
    const subs = this.UsuariosServ.DeleteUserRole({ userId: this.SELECTED_USER, roleId: roleId }).subscribe(r => {
      if (Array.isArray(r)) {
        this.ROLES = r;
      } else {
        console.error(r);
      }
      subs.unsubscribe();
    })
  }

  /**
   * Agregar un rol al usuario
   * @param roleId 
   */
  addRole(roleId: number) {
    const subs = this.UsuariosServ.AddRole({ userId: this.SELECTED_USER, roleId: roleId }).subscribe(r => {
      if (Array.isArray(r)) {
        this.ROLES = r;
      } else {
        console.error(r);
      }
      subs.unsubscribe();
    })
  }

  deleteUser() {
    this.UsuarioAdminServ.Delete({ userId: this.SELECTED_USER }).toPromise().then(r => {
      console.log(r);
    })
  }

  /**
   * Determina que funciones ejecutar dependiendo del uso que se le dará al modal.
   */
  actions() {
    switch (this.SELECTED_MODAL) {
      case 'roles':
        const subs = this.UsuariosServ.GetUserRoles({ id: this.SELECTED_USER }).subscribe(r => {
          this.ROLES = r;
          subs.unsubscribe();
        })
        break;
      case 'datospersonales':
        const subs2 = this.PersonaServ.GetInfoPersona({ userId: this.SELECTED_USER }).subscribe(r => {
          this.PERSONAL_DATA = r;
          subs2.unsubscribe();
        })
        break;
      case 'borrar':
        this.SELECTED_USER_TO_ERASE = this.USUARIOS.find((u => u.cveUsuario === this.SELECTED_USER));
        break;

      default:
        break;
    }
  }

}
