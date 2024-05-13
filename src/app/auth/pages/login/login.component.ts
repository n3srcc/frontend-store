import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../../auth.token.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.http
        .post<any>(`${environment.url}user/auth`, {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
        .subscribe(
          (response) => {
            this.authTokenService.setToken(response.token);
            this.router.navigate(['/admin/product']);
          },
          (error) => {
            console.error('Error de inicio de sesión:', error);
            this.errorMessage = error.error?.error || 'Error en la solicitud';
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
