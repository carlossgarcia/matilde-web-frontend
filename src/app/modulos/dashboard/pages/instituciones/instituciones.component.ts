import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InstitucionesService } from '../../services/instituciones.service';
declare var $: any;
@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.scss']
})
export class InstitucionesComponent implements OnInit {

  // Infinite scroller
  throttle = 200;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  // Esto solo si no se modifica el tamaño a tomar
  PREVIUS_SKIP = 0;
  DEFAULT_TAKE_AMOUNT = 10;
  TOTAL_AMOUNT = 0;

  INSTITUCIONES: any[];
  InstitucionForm = new FormGroup({
    nombre: new FormControl(),
    siglas: new FormControl(),
    fecha_exp: new FormControl(),
  });

  search(event: KeyboardEvent, text: string) {
    console.log(event.key);

    if (event.key === 'Enter') {
      const subs = this.instS.Paginate({ searchParams: { nombre: text, siglas: text } }).subscribe(r => {
        this.INSTITUCIONES = r[0];
        subs.unsubscribe();
      });
    }
  }

  onScrollDown() {
    console.log('scrolling down');

    const subs = this.instS.Paginate({ skip: this.PREVIUS_SKIP += this.DEFAULT_TAKE_AMOUNT }).subscribe(r => {
      this.INSTITUCIONES = this.INSTITUCIONES.concat(r[0]);
      subs.unsubscribe();
    });
    this.direction = 'down';
  }

  InitData() {
    const subs = this.instS.Paginate().subscribe(r => {
      this.INSTITUCIONES = r[0];
      this.TOTAL_AMOUNT = r[1];
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
      if (r.error) { alert(r.msg); return; }
      this.InstitucionForm.reset();
      this.INSTITUCIONES.push(r.output)
      subs.unsubscribe();
    })
  }

}
