import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthTokenService } from './auth.token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private authTokenService: AuthTokenService,
    private jwt: JwtHelperService
  ) {}

  logout(): void {
    this.authTokenService.removeToken();
    window.location.href = '/auth/login';
  }

  isLoggedIn(): boolean {
    const token = this.authTokenService.getToken();
    return !this.jwt.isTokenExpired(token);
  }
}
