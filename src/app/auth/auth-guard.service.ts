import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      }));
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  //   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.authService.user.pipe(take(1),
  //     map(user => {
  //       return !!user;
  //     }), tap((isAuthenticated: boolean) => {
  //       if (!isAuthenticated) {
  //         this.router.navigate(['/auth']);
  //       }
  //     }));
  // }
}
