import { Injectable } from '@angular/core';
import { AuthService } from 'ngx-auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const refreshUrl = "api/auth/refresh";
const loginUrl = "api/auth/login";

interface AccessData {
  access_token: string;
  refresh_token: string;
  user_id: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements AuthService {

  constructor(
    private http: HttpClient,
    private router: Router, 
    private tokenStorage: TokenStorageService) { }

  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage.getAccesToken().pipe(map(
      token => !!token
    ));
  }

  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccesToken();
  }

  public getUser(): Observable<string> {
    return this.tokenStorage.getUserId();
  }

  public refreshToken(): Observable <AccessData> {
    return this.tokenStorage
    .getRefreshToken()
    .pipe(
      switchMap(
        (refresh_token: string) => 
        this.http.post(refreshUrl,{refresh_token})
      ),
      tap((tokens: AccessData) => this.saveAccessData(tokens)),
      catchError((err) => {
          this.logout();

          return Observable.throw(err); 
        })
    );
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401 
  }

  public verifyTokenRequest(url: string): boolean{
    return url.endsWith('/refresh');
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(loginUrl, { username, password})
    .pipe(tap(
      (tokens: AccessData) => this.saveAccessData(tokens)
    ));
  }

  public logout(): void {
    this.tokenStorage.clear();
    location.reload(true);
    this.router.navigate(['/login']);
  }

  private saveAccessData({access_token, refresh_token, user_id}: AccessData) {
    this.tokenStorage
    .setAccesToken(access_token)
    .setUserId(user_id)
    .setRefreshToken(refresh_token);
  }

}
