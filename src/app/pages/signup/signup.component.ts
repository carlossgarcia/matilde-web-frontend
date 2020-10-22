import { Component, OnInit } from '@angular/core';
import { SpinnerUtilities } from '../../classes/spinners';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  SignupForm = new FormGroup({
    correo: new FormControl(''),
    contrasena: new FormControl(''),
    confirmar: new FormControl(''),
  });

  SignupBtn: HTMLButtonElement;
  SignupError = false;
  SignupMsg = '';

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.SignupBtn = document.querySelector('#SignupBtn');
    this.TriggerLogin();
  }

  TriggerLogin(): void {
    const utilities = new SpinnerUtilities(this.SignupBtn);
    this.SignupBtn.addEventListener('click', () => {
      this.SignupError = false;
      this.SignupMsg = '';
      utilities.AddSpinnerToButton().then(() => {
        this.authService.Signup({ datos: this.SignupForm.value }).subscribe(result => {
          console.log(result);
          
          if (result.error) {
            this.SignupError = true;
            this.SignupMsg = result.msg;
            utilities.RemoveSpinnerFromButton();
          } else {
            const url = result.data.url;
            this.router.navigateByUrl('signup/person/' + url);
          }
        });
      });
      console.log('Desarrollar lógica');
    });
  }

}
