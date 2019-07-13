import { TestBed } from '@angular/core/testing';

import { TabeService } from './tabe.service';

describe('TabeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabeService = TestBed.get(TabeService);
    expect(service).toBeTruthy();
  });
});
