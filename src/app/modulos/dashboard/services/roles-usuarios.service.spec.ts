import { TestBed } from '@angular/core/testing';

import { RolesUsuariosService } from './roles-usuarios.service';

describe('UsuariosService', () => {
  let service: RolesUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
