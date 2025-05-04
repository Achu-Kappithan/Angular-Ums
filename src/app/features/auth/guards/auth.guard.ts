import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, } from '@ngrx/store';
import { userState } from '../states/reducer';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const store = inject(Store)
  const router = inject(Router)

  return store.select(state=> state.user).pipe(
    take(1),
    map((userState: userState)=>{
      const isAuthenticated =  !!userState.logedInUser && !!userState.jwtToken;
      if (isAuthenticated) {
        return true; // Allow access to the route
      }
      // Redirect to login with the return URL
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  )

};
