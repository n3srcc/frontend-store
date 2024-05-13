import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthTokenService } from '../auth.token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
class AuthorizationGuard {
  constructor(
    private router: Router,
    private authTokenService: AuthTokenService,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      if (this.jwtHelper.isTokenExpired(this.authTokenService.getToken())) {
        return false;
      } else {
        return true;
      }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthorizationGuard).canActivate(next, state);
};
