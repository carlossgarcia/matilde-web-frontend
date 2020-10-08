import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public authS: AuthService) { }
  UserProfile = this.authS.UserData.UserCopy;
  ProfileForm = new FormGroup({
    nombre: new FormControl(this.UserProfile.persona.nombre),
    apellidoPaterno: new FormControl(this.UserProfile.persona.apellidoPaterno),
    apellidoMaterno: new FormControl(this.UserProfile.persona.apellidoMaterno),
    correo: new FormControl(this.UserProfile.correo),
  });


  ngOnInit(): void {
    console.log(this.ProfileForm.value);

  }

}
