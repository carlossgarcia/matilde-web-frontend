import { Component, OnInit } from '@angular/core';
import { SpinnerUtilities } from '../../classes/spinners';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    correo: new FormControl(),
    contrasena: new FormControl(),
    recordarme: new FormControl(false),
  });
  LoginBtn: HTMLButtonElement;
  LoginError = false;
  LoginMsg = '';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.LoginBtn = document.querySelector('#LoginBtn');
    this.TriggerLogin();
  }

  TriggerLogin(): void {
    const utilities = new SpinnerUtilities(this.LoginBtn);
    this.LoginBtn.addEventListener('click', () => {
      this.LoginError = false;
      this.LoginMsg = '';
      utilities.AddSpinnerToButton().then(() => {
        const subs = this.authService.Login({ usuario: this.LoginForm.value }).subscribe(result => {
          if (result.error) {
            this.LoginError = true;
            this.LoginMsg = result.msg;
            if (result.data.action === 'redirect') {
              setTimeout(() => {
                this.router.navigateByUrl(result.data.url);
              }, 1000);
            }
          } else {
            if (result.data.action === 'redirect') {
              setTimeout(() => {
                this.authService.isLoggedIn = true;
                this.router.navigateByUrl(result.data.url);
              }, 1000);
            }
          }
          subs.unsubscribe();
          utilities.RemoveSpinnerFromButton();
        });
      });
      console.log('Desarrollar lógica');
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.LoginForm.value);
  }
}


