import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginActiveGuard } from './login-active.guard';

describe('loginActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
