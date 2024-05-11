import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../../auth.token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {}

  login(): void {
    this.http.post<any>(`${environment.url}user/auth`, { username: this.username, password: this.password }).subscribe(
      (response) => {
        this.authTokenService.setToken(response.token);
        this.router.navigate(['/admin/products']);
      },
      (error) => {
        console.error('Error de inicio de sesión:', error);
      }
    );
  }
}
