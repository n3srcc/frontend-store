import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from '../../../auth.token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
})
export class ForgetComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {}

}
