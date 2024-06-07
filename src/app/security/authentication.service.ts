import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AuthenticationResponse {
  status: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  redirectUrl = '/';

  constructor() {}

  static isLoggedIn() {
    const token = AuthenticationService.getToken();
    return !!token && !AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string) {
    // try {
    //   const decoded: JwtPayload = jwt_decode(token);
    //   return decoded.exp === undefined ? false : decoded.exp < Date.now()
    // } catch (err){
    //   return false;
    // }
    return false;
  }

  static setToken(idToken: string) {
    sessionStorage.setItem('id_token', idToken);
  }

  static getToken() {
    return sessionStorage.getItem('id_token');
  }

  static logout() {
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(/*username, password, role*/): Observable<AuthenticationResponse> {
    //   const url = `${this.authenticationUrl}/login`;
    //   const httpOptions = {
    //     headers:new HttpHeaders({
    //       'Content-Type':'application/json'
    //     })
    //   };
    //
    //   return this.httpClient.request<AutheticationResponse>('POST', url, {
    //     body: {username,
    //       password,
    //       role
    //   },
    //   headers : httpOptions.headers
    // }).pipe(
    //   tap((data)=> AuthenticationService.setToken((data.token)))
    // );

    const response: AuthenticationResponse = {
      status: true,
      message: 'HTTP 200',
      token: 'atoken',
    };
    AuthenticationService.setToken('token');
    return of(response);
  }
}
