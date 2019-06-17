import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe-model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    console.log('recipe resolver called');
    console.log('isInitialized: ' + this.recipeService.isInitialized);
    let currentUser = null;
    this.authService.user.pipe(take(1)).subscribe(
      (user: User) => {
        currentUser = user;
      });
    console.log(currentUser);

    if (currentUser && !this.recipeService.isInitialized) {
      this.recipeService.isInitialized = true;
      return this.dataStorageService.fetchRecipes();
    }

  }
}
