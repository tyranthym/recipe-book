import { Injectable } from '@angular/core';
import { Recipe } from './recipe-model';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes.push(new Recipe('first recipe', 'this is the first one',
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
        new Ingredient('Meat', 1)]));
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
