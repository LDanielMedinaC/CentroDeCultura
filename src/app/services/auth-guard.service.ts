import { Injectable } from '@angular/core';
import { AuthService } from './../core/auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if(this.authService.isLoggedIn()){
      console.log('can Activate')
      return true;
    }
    console.log('cant Activate')
    this.router.navigate(['/']);
    return false;
  }
}
