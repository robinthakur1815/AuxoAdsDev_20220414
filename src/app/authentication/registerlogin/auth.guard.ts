import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router, } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    if (localStorage.getItem('useremail') == null && localStorage.getItem('role_id') == null) {
      
      this.router.navigate(['login']);
      return false;
    } else {
      
      // return route.data.roles.some( ai => this.user.getRoles().includes(ai) ); 
      return route.data.roles.some( ai => localStorage.getItem('role').includes(ai)); 
      // return true;
    }

  }
}
