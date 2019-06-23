import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMsg = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFacotoryResolver: ComponentFactoryResolver) { }

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
          this.createErrorAlert(errorMsg);
          this.isLoading = false;
        });
    } else {
      this.authService.signIn(email, password).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/recipes']);
        }, errorMsg => {
          this.errorMsg = errorMsg;
          this.createErrorAlert(errorMsg);
          this.isLoading = false;
        }
      );
    }
    form.resetForm();
  }

  onHandleError() {
    this.errorMsg = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  // using programmatical methods to crate dynamic components
  private createErrorAlert(message: string) {
    const alertComponentFactory = this.componentFacotoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewComponentRef = this.alertHost.viewContainerRef;
    hostViewComponentRef.clear();

    const componentRef = hostViewComponentRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeAlert.pipe(take(1)).subscribe(() => {
      hostViewComponentRef.clear();
    });
  }

}
