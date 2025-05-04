import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import {userReducer} from './features/auth/states/reducer'
import { provideEffects } from '@ngrx/effects';
import { userEffect } from './features/auth/states/effect';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
// import { getUserReducer } from './features/user/states/reducer';
// import { UserprofileEffect } from './features/user/states/effect';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({userState:userReducer}),
    provideEffects(userEffect),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
