import { Component, OnInit } from '@angular/core';
import { SpinnerUtilities } from '../../classes/spinners';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    usuario: new FormControl(''),
    contrasena: new FormControl(''),
    recordarme: new FormControl(''),
  });

  LoginBtn: HTMLButtonElement;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.LoginBtn = document.querySelector('#LoginBtn');
    this.TriggerLogin();
  }

  TriggerLogin(): void {
    const utilities = new SpinnerUtilities(this.LoginBtn);
    utilities.AddSpinnerToButton().then(() => {
      this.authService.Login(this.LoginForm.value).subscribe(obsvr => {
        console.log(obsvr)
      });
      console.log('Desarrollar lógica');
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.LoginForm.value);
  }
}


