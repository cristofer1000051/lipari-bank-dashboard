import { TestBed } from '@angular/core/testing';

import { InvestmentTicker } from './investment-ticker';

describe('InvestmentTicker', () => {
  let service: InvestmentTicker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentTicker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
