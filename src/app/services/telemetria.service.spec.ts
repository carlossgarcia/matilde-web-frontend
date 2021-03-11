import { TestBed } from '@angular/core/testing';

import { TelemetriaService } from './telemetria.service';

describe('TelemetriaService', () => {
  let service: TelemetriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelemetriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
