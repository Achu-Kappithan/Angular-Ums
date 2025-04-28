import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import {userReducer} from './features/auth/states/reducer'
import { provideEffects } from '@ngrx/effects';
import { userEffect } from './features/auth/states/effect';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideStore({userState:userReducer}),
    provideHttpClient(),
    provideEffects(userEffect)
  ]
};
