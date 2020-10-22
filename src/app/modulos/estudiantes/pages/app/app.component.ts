import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loading.show();
    setTimeout(() => {
      this.loading.hide();
    }, 3800);
  }

}
