import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
 private http = inject(HttpClient)
 private url = "http://localhost:3001/user"

 getLoggedInUser():Observable<any>{
  console.log("fetchdata works")
  return this.http.get<any>(`${this.url}/fetchUserData`)
 }

  
}
