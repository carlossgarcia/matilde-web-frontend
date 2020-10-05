import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnityComponent } from './unity/unity.component';



@NgModule({
  declarations: [UnityComponent],
  imports: [
    CommonModule
  ],
  exports: [UnityComponent]
})
export class SharedModule { }
