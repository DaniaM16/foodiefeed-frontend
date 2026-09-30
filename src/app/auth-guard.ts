//wird benötigt, um Router im Guard zu verwenden
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => { 
  //schützt Seiten davor, ohne Login geöffnet zu werden

  const router = inject(Router);
  const token = localStorage.getItem('token'); //Holt Login-Token aus dem Browser

  if (token) { //mit Token kann Seite geöffnet werden
    return true;
  }
return router.createUrlTree( ['/login']);
};
