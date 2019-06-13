import { Injectable } from '@angular/core';
import { Recipe } from './recipe-model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];
  isInitialized = false;
  changeRecipesEvent = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  // setter
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.changeRecipesEvent.next(this.recipes);
  }

  // getter
  getRecipes() {
    return this.recipes.slice();
  }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.mergeIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.changeRecipesEvent.next(this.recipes);
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.changeRecipesEvent.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.changeRecipesEvent.next(this.recipes);
  }

  initDefaultRecipes() {
    this.recipes = [
      new Recipe('first recipe', 'this is the first one',
        'https://www.rachnas-kitchen.com/wp-content/uploads/2015/03/Kadai-paneer.jpg',
        [new Ingredient('Meat', 1),
        new Ingredient('Tomato', 2)]),
      new Recipe('second recipe', 'this is the second one',
        'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/day_and_night.jpg',
        [new Ingredient('Chocolate', 2),
        new Ingredient('Apple', 2)]),
      new Recipe('third one', 'this is the third one',
        'https://usercontent1.hubstatic.com/13697042_f1024.jpg',
        [new Ingredient('Bun', 2),
        new Ingredient('Meat', 1)])];
  }



  // findRecipeByName(name: string): Recipe {
  //   const filteredRecipes: Recipe[] = [];
  //   for (const recipe of this.recipes) {
  //     if (recipe.name === name) {
  //       filteredRecipes.push(recipe);
  //     }
  //   }
  //   return filteredRecipes[0];
  // }
}
