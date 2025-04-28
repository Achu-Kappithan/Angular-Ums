import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserInterface {
  name: string,
  email: string,
  phoneNumber: string,
  password: string
}

export interface ResponceInterface {
  _id : string,
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  is_admin: boolean,
  profile: string
}

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private url = "http://localhost:3001/user"

  constructor (private http : HttpClient){}

  registerUser(user:UserInterface){
    console.log("service userdata ",user)
    return this.http.post<any>(`${this.url}/register`,user )
  }

}
