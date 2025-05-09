import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutServiceService {
 
  setToken(token: string) {
    localStorage.setItem('token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  removeToken() {
    localStorage.removeItem('token');
  }

 
  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }
}
