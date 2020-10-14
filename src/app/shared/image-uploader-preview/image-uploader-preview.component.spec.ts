import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploaderPreviewComponent } from './image-uploader-preview.component';

describe('ImageUploaderPreviewComponent', () => {
  let component: ImageUploaderPreviewComponent;
  let fixture: ComponentFixture<ImageUploaderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploaderPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
