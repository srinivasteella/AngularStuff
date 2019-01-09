import { CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()

export class AuthGuard implements CanActivateChild {

  constructor(private authservice: AuthService, private route: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //       this.authservice.isAuthenticated()
  //       .then(
  //           (authenticated: boolean){
  //             if (authenticated) {
  //               return true;
  //             } else {this.route.navigate(['/']); }
  //           }
  //       );
  // }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authservice.isAuthenticated()
    .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {this.route.navigate(['/']); }
        }
    );
}

}
