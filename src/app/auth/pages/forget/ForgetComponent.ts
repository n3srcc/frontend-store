import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
})
export class ForgetComponent {
  recoveryForm: FormGroup;
  errorMessage: string | null = null;
  recoveryLink: string | null = null;

  constructor(private http: HttpClient, private location: Location) {
    this.recoveryForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });
  }

  recovery(): void {
    if (this.recoveryForm.valid) {
      this.http
        .post<any>(`${environment.url}user/forgot-password`, {
          username: this.recoveryForm.value.username,
        })
        .subscribe(
          (response) => {
            const token = response.token || '';
            this.recoveryLink = `${token}`;
            const currentUrl = this.location.path();
            const updatedUrl = currentUrl.replace(
              /\/[^\/]*$/,
              `/recovery/${token}`
            );
            this.recoveryLink = updatedUrl;
          },
          (error) => {
            this.errorMessage = error.error?.error || 'Error en la solicitud';
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);
          }
        );
    } else {
      this.recoveryForm.markAllAsTouched();
    }
  }
}
