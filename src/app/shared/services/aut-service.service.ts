import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutServiceService {
  // Save token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove token (on logout)
  removeToken() {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }
}
