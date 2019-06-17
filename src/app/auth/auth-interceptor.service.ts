import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpParams, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(
      (user: User) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.idToken)
        });
        return next.handle(modifiedReq);
      }));

  }

}
