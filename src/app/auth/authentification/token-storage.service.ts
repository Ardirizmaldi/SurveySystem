import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public getAccesToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('access_token');
    return of(token);
  }

  public getUserId(): Observable<string> {
    const id: string = <string>localStorage.getItem('user_id');
    return of(id);
  }

  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refresh_token');
    return of(token);
  }

  public setAccesToken(token: string): TokenStorageService {
    localStorage.setItem('access_token', token);

    return this;
  }

  public setRefreshToken(token: string): TokenStorageService {
    localStorage.setItem('refresh_token', token);

    return this;
  }

  public setUserId(id: string): TokenStorageService {
    localStorage.setItem('user_id', id);

    return this;
  }

  public clear() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  }

}