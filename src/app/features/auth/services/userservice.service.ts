import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

export interface UploadResponse {
  user: UserInterface;
  message: string;
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

  loginUser(logininfo:{email:string,password: string}){
    console.log("service login data",logininfo.email,logininfo.password)
    return this.http.post<any>(`${this.url}/login`,logininfo)
  }




  uploadProfilePicture(file: File): Observable<{ profilePictureUrl: string }> {
    const formData = new FormData();
    console.log(formData, file)
    formData.append('profilePicture', file);
    return this.http.post<{ profilePictureUrl: string }>(
      `${this.url}/profile-picture`,
      formData
    );
  }

}
