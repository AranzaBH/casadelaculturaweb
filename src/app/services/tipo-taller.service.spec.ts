import { TestBed } from '@angular/core/testing';

import { TipoTallerService } from './tipo-taller.service';

describe('TipoTallerService', () => {
  let service: TipoTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
