import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-image-uploader-preview',
  templateUrl: './image-uploader-preview.component.html',
  styleUrls: ['./image-uploader-preview.component.scss']
})
export class ImageUploaderPreviewComponent implements OnInit {


  uploadedImage: File;
  imagePreview: string | ArrayBuffer;
  figcaption: string;
  hasUploadedImage = false;
  hasChangeImage = false;

  @Input() preloadUserImg: string;
  @Input() url: string;
  @Output() urlEvent = new EventEmitter<string>();

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public uploadS: UploadService) { }

  ngOnInit(): void {
    if (this.preloadUserImg !== '') {
      this.imagePreview = this.preloadUserImg;
      this.hasUploadedImage = true;
    }
  }

  onImageChange(event): void {
    const image = event.target.files[0];

    this.ng2ImgMax.resizeImage(image, 300, 200).subscribe(
      result => {
        this.uploadedImage = new File([result], result.name);
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = () => {
          this.imagePreview = reader.result;
          this.hasChangeImage = true;
          this.figcaption = 'Sonríe a la cámara. 😄';
        };
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }

  Upload(): void {
    const form = new FormData();
    form.append('avatar', this.uploadedImage);
    const subs = this.uploadS.UploadImage(this.url, form).subscribe(r => {
      this.urlEvent.emit(r);
      subs.unsubscribe();
    });
  }
}
