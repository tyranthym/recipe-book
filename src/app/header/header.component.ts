import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { Recipe } from '../recipes/recipe-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;
  private tokenExpirationInCounter: any;
  expiresInSec: number;


  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user: User) => {
        this.isAuthenticated = !!user;
        // set count down
        if (!this.isAuthenticated) {
          window.clearInterval(this.tokenExpirationInCounter);
          this.tokenExpirationInCounter = null;
        } else {
          this.tokenExpirationInCounter = window.setInterval(() => {
            this.expiresInSec = Math.ceil(user.tokenExpiresIn / 1000);
          }, 1000);
        }
      }
    );
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
      });
  }

  onResetData() {
    this.dataStorageService.clearRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
