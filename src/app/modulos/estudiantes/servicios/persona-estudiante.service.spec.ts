import { TestBed } from '@angular/core/testing';

import { PersonaEstudianteService } from './persona-estudiante.service';

describe('PersonaEstudianteService', () => {
  let service: PersonaEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
