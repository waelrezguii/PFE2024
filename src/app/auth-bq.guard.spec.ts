import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authBqGuard } from './auth-bq.guard';

describe('authBqGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authBqGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
