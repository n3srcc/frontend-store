import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../../auth.token.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.password.component.html',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  token: string | null = null;

  constructor(
    private router: Router,
    private authTokenService: AuthTokenService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.http
        .post<any>(`${environment.url}user/reset-password`, {
          token: this.token,
          password: this.resetPasswordForm.value.password
        })
        .subscribe(
          (response) => {
            this.successMessage = response.message || 'Restablecimiento de contraseña exitoso';
          },
          (error) => {
            this.errorMessage = error.error?.error || 'Error en la solicitud';
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);
          }
        );
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  passwordsMatch(): boolean {
    const password = this.resetPasswordForm.get('password')!.value;
    const password2 = this.resetPasswordForm.get('password2')!.value;
    return password === password2;
  }
}
