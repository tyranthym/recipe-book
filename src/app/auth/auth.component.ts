import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMsg = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchLogin() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode === false) {
      this.authService.signUp(email, password).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/recipes']);
        }, errorMsg => {
          this.errorMsg = errorMsg;
          this.isLoading = false;
        });
    } else {
      this.authService.signIn(email, password).subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/recipes']);
          }, errorMsg => {
            this.errorMsg = errorMsg;
            this.isLoading = false;
          }
        );
    }
    form.resetForm();
  }

}
