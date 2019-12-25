import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn : 'root'
})
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.auth.isUserValid()) {
      return true;
    }
    else {
      // alert("Please")
      this.router.navigate(["/homepage"]);

      return false;
    }


  }
}
