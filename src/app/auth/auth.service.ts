import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthSignUpResponseData, AuthSignInResponseData } from './auth-firebase.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthSignUpResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseApiKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      console.log(errorRes);
      let errorMsg = 'An unknown error occurred!';
      if (errorRes && errorRes.error && errorRes.error.error) {
        const errorCode = errorRes.error.error.message;
        switch (errorCode) {
          case 'EMAIL_EXISTS':
            errorMsg = 'The email address is already in use by another account.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
        }
      }
      return throwError(errorMsg);
    }), tap(
      (resData: AuthSignUpResponseData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      }
    ));
  }

  signIn(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthSignInResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseApiKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
      console.log(errorRes);
      let errorMsg = 'An unknown error occurred!';
      if (errorRes && errorRes.error && errorRes.error.error) {
        const errorCode = errorRes.error.error.message;
        switch (errorCode) {
          case 'EMAIL_NOT_FOUND':
            errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
          case 'INVALID_PASSWORD':
            errorMsg = 'The password is invalid or the user does not have a password.';
            break;
          case 'USER_DISABLED':
            errorMsg = 'The user account has been disabled by an administrator.';
            break;
        }
      }
      return throwError(errorMsg);
    }), tap(
      (resData: AuthSignInResponseData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      }
    ));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // remove user data in localStorage
    window.localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      window.clearInterval(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _idToken: string;
      _tokenExpirationDate: string
    } = JSON.parse(window.localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const authenticatedUser = new User(userData.email, userData.id, userData._idToken, new Date(userData._tokenExpirationDate));
    if (authenticatedUser.idToken) {
      this.user.next(authenticatedUser);
      // set autoLogout
      const now = new Date().getTime();
      const expiresInMiliSec = new Date(userData._tokenExpirationDate).getTime() - now;
      console.log(expiresInMiliSec);
      this.autoLogout(expiresInMiliSec);
    }
  }

  autoLogout(expiresInMiliSec: number) {
    this.tokenExpirationTimer = window.setInterval(() => {
      this.logout();
    }, expiresInMiliSec);
  }

  private handleAuthentication(email: string, id: string, idToken: string, expiresIn: string) {
    const expiresInMiliSec: number = (+expiresIn) * 1000;
    console.log('new token expired within: ' + expiresInMiliSec / 1000 + 's.');
    // set autoLogout
    this.autoLogout(expiresInMiliSec);

    const expirationDate = new Date(new Date().getTime() + expiresInMiliSec);
    const user = new User(email, id, idToken, expirationDate);
    this.user.next(user);
    // save user data to storage
    window.localStorage.setItem('userData', JSON.stringify(user));
  }

}
