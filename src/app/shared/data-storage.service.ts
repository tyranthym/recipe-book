import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe-model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private router: Router, private authService: AuthService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://project1-c3157.firebaseio.com/recipes.json', recipes).subscribe(
      res => {
        console.log(res);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {

    return this.http.get<Recipe[]>('https://project1-c3157.firebaseio.com/recipes.json')
    .pipe(
      map((recipes: Recipe[]) => {
        if (recipes && recipes.length) {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }
        recipes = [];
        return recipes;
      }),
      tap((recipes: Recipe[]) => {
        console.log('fetchRecipes() called');
        if (recipes && recipes.length) {
          this.recipeService.setRecipes(recipes);
        } else {
          this.recipeService.initDefaultRecipes();
        }
      })
    );
  }

  clearRecipes() {
    this.http.delete('https://project1-c3157.firebaseio.com/recipes.json').subscribe(res => {
      this.recipeService.initDefaultRecipes();
      const recipes = this.recipeService.getRecipes();
      this.recipeService.changeRecipesEvent.next(recipes);
      console.log(this.recipeService.getRecipes());
      this.router.navigate(['/recipes']);
    });
  }

}


