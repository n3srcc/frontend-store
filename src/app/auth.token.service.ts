import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  constructor(private http: HttpClient) {}
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getTokenHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

}
