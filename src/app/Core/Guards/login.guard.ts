import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const _router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);




  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      //navigation
      _router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
