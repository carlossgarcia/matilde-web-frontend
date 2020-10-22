import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MENU_ITEMS } from './util/sidemenu';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  htmlRoutes = MENU_ITEMS;

  constructor(public authS: AuthService) { }

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
