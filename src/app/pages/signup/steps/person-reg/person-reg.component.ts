import { Component, OnInit } from '@angular/core';
import { SpinnerUtilities } from '../../../../classes/spinners';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-person-reg',
  templateUrl: './person-reg.component.html',
  styleUrls: ['./person-reg.component.scss']
})
export class PersonRegComponent implements OnInit {
  PersonaRegForm = new FormGroup({
    usuario: new FormControl(''),
    nombre: new FormControl(''),
    apellidoma: new FormControl(''),
    apellidopa: new FormControl(''),
    fechaNacim: new FormControl(''),
    genero: new FormControl('')
  });

  PersonaRegBtn: HTMLButtonElement;
  PersonaRegError = false;
  PersonaRegMsg = '';
  url = '';
  constructor(public authService: AuthService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url');

    const subs = this.authService.VerifyPersonPreRegistration({ url: this.url }).subscribe(result => {
      if (result.error) {
        this.router.navigateByUrl('login');
      } else {
        subs.unsubscribe();
      }
    });

    this.PersonaRegBtn = document.querySelector('#SignupBtn');
    this.TriggerLogin();
  }

  TriggerLogin(): void {
    const utilities = new SpinnerUtilities(this.PersonaRegBtn);
    this.PersonaRegBtn.addEventListener('click', () => {
      this.PersonaRegError = false;
      this.PersonaRegMsg = '';
      utilities.AddSpinnerToButton().then(() => {
        const datos = this.PersonaRegForm.value;
        datos.token = this.url;
        const subs = this.authService.CompleteRegister({ datos }).subscribe(result => {
          if (result.error) {
            this.PersonaRegError = true;
            this.PersonaRegMsg = result.msg;
          } else {
            this.PersonaRegError = result.error;
            this.PersonaRegMsg = result.msg;

            if (result.data.action === 'redirect') {
              this.authService.isLoggedIn = false;
              this.router.navigateByUrl(result.data.url);
            }
          }
          utilities.RemoveSpinnerFromButton();
          subs.unsubscribe();
        });
      });
      console.log('Desarrollar lógica');
    });
  }

}
