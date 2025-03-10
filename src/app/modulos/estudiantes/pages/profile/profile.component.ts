import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { PersonaEstudianteService } from '../../servicios/persona-estudiante.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(
    public authS: AuthService,
    public personaEstS: PersonaEstudianteService
  ) { }

  UserProfile = this.authS.UserData.UserCopy;
  ProfileForm = new FormGroup({
    nombre: new FormControl(this.UserProfile.persona.nombre),
    apellidoPaterno: new FormControl(this.UserProfile.persona.apellidoPaterno),
    apellidoMaterno: new FormControl(this.UserProfile.persona.apellidoMaterno),
    correo: new FormControl(this.UserProfile.correo),
  });


  ngOnInit(): void { }

  Update(): void {
    console.log('Actualizando...');
    document.querySelector('#BtnSave').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="sr-only">Actualizando...</span>`;
    const subs = this.personaEstS.UpdatePersonaInfo(this.ProfileForm.value).subscribe(result => {
      if (result.error === false) {
        this.authS.UserClass.UpdatePersona(this.ProfileForm.value);
      }
      subs.unsubscribe();
      document.querySelector('#BtnSave').innerHTML = 'Guardar';
    })
  }

  getProfileImgUrl(event): void {
    console.log(event);
    const url = `${environment.url}/${event}`;
    this.authS.UserClass.UpdatePersonaImg({ url });
  }

}
