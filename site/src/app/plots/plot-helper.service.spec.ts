import { TestBed } from '@angular/core/testing';

import { PlotHelperService } from './plot-helper.service';

describe('PlotHelperService', () => {
  let service: PlotHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
