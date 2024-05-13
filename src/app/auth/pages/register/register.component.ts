import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.http.post<any>(`${environment.url}user`, { username, password })
        .subscribe(
          (response) => {
            this.errorMessage = null;
            this.successMessage = response?.message || 'Registro exitoso';
            setTimeout(() => {
              this.successMessage = null;
            }, 6000);
          },
          (error) => {
            this.errorMessage = error.error?.error || 'Error en la solicitud';
            console.error('Error en la solicitud POST:', error);
            setTimeout(() => {
              this.errorMessage = null;
            }, 6000);

          },
        );
    } else {
      // Manejar el caso en que el formulario no sea válido
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
    }
  }
}
