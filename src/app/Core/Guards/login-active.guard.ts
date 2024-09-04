import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginActiveGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('token') !== null) {
      _router.navigate(['/home']);

      return false;
    } else {
      //navigation
      return true;
    }
  } else {
    return false;
  }
};
