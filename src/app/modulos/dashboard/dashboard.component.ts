import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.OpenSideBar();
  }

  OpenSideBar(): void {
    $('#sidebarCollapse').on('click', () => {
      $('#sidebar').toggleClass('active');
      $('#body').toggleClass('active');
    });
  }

}
