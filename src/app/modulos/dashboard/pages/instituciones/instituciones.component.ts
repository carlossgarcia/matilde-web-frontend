import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InstitucionesService } from '../../services/instituciones.service';
declare var $: any;
@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  INSTITUCIONES: any[];
  InstitucionForm = new FormGroup({
    nombre: new FormControl(),
    siglas: new FormControl(),
    fecha_exp: new FormControl(),
  });

  InitData() {
    const subs = this.instS.GetAll().subscribe(r => {
      this.INSTITUCIONES = r.data;
      setTimeout(() => {
        $('#dataTables-instituciones').DataTable({
          responsive: true,
          pageLength: 20,
          lengthChange: false,
          searching: true,
          ordering: true
        });
      }, 100);
      subs.unsubscribe();
    });
  }

  constructor(public instS: InstitucionesService) {
    this.InitData();
  }

  ngOnInit(): void {

  }

  Create() {
    const subs = this.instS.Create(this.InstitucionForm.value).subscribe(r => {
      console.log(r);
      subs.unsubscribe();
    })
  }

}
