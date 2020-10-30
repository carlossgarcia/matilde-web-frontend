import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnityComponent } from './unity/unity.component';
import { ImageUploaderPreviewComponent } from './image-uploader-preview/image-uploader-preview.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [UnityComponent, ImageUploaderPreviewComponent],
  imports: [
    CommonModule,
    Ng2ImgMaxModule,
    HttpClientModule
  ],
  exports: [UnityComponent, ImageUploaderPreviewComponent]
})
export class SharedModule { }
