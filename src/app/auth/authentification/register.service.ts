import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

const apiUrl = 'api/auth/register';
const uploadProfile = '/api/file/upload/survey-profile';
const headerConfig = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user): Observable<User> {
    return this.http.post<User>(apiUrl, user, headerConfig);
  }

  public uploadImageProfile(image: Blob, nama: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', nama);
    formData.append('image', image);
    return this.http.post(uploadProfile, formData);
}
}
