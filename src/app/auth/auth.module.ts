import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthTokenService } from '../auth.token.service';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { ResetPasswordComponent } from './pages/reset-password/reset.password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgetComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  exports: [],
  providers: [AuthTokenService]
})
export class AuthModule { }
