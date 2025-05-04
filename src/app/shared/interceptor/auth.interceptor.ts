import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';


import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  console.log('Interceptor triggered for URL:', req.url);

  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    try {
      token = localStorage.getItem('jwtToken');
      console.log('Token from localStorage:', token || 'No token found');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  } else {
    console.log('Running on server, skipping localStorage access');
  }

  if (token) {
    console.log('Adding Authorization header with token:', token);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  console.log('No token found, proceeding without Authorization header');
  return next(req);
};