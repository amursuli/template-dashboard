import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { environment } from '../.././environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(state: RouterStateSnapshot) {
    if (environment.defaultauth === 'firebase') {
      const currentUser = this.authenticationService.currentUser();
      if (currentUser) {
        // logged in so return true
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
