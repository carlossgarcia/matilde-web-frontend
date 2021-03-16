import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  mail(form: NgForm){
    console.log(form.value);
    
    if(form.valid){
      let nombre = form.value.nombre;
      let asunto = form.value.asunto;
      let mensaje = form.value.mensaje;
      window.location.href = "mailto:gamemaster@dritdi.mx?subject=" + nombre + ': ' + asunto + "&body=" + mensaje;
    }
  }

}
