import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }
