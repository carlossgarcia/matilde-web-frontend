import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegComponent } from './person-reg.component';

describe('PersonRegComponent', () => {
  let component: PersonRegComponent;
  let fixture: ComponentFixture<PersonRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
