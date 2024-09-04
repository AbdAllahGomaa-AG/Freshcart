import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService {
  public readonly _HttpClient = inject(HttpClient);
  public readonly _Router = inject(Router);
  userData: any = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.busUrl}/api/v1/auth/signup`,
      data
    );
  }
  //
  loginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.busUrl}/api/v1/auth/signin`,
      data
    );
  }

  saveTokenPass(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      console.log('user', this.userData);
    }
  }

  singOut(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  SetEmail(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.busUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  SetCode(data: object): Observable<any> {
    return this._HttpClient.post(`${environments.busUrl}/api/v1/auth/verifyResetCode`,data
    );
  }

  SetRestPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environments.busUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
