import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 2),
    new Ingredient('Tomato', 3)];

  changeIngredientsEvent = new Subject<Ingredient[]>();
  editIngredientEvent = new Subject<number>();

  constructor() { }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  mergeIngredient(newIngredient: Ingredient) {
    const originIngredients = this.ingredients;
    let isNewType = true;
    for (const originIngredient of originIngredients) {
      if (originIngredient.name === newIngredient.name) {
        isNewType = false;
        originIngredient.amount += newIngredient.amount;
      }
    }
    if (isNewType === true) {
      originIngredients.push(newIngredient);
    }
    this.changeIngredientsEvent.next(this.ingredients);
  }

  mergeIngredients(newIngredients: Ingredient[]) {
    const originIngredients = this.ingredients;
    for (const newIngredient of newIngredients) {
      let isNewType = true;
      for (const originIngredient of originIngredients) {
        if (originIngredient.name === newIngredient.name) {
          isNewType = false;
          originIngredient.amount += newIngredient.amount;
        }
      }
      if (isNewType === true) {
        originIngredients.push(newIngredient);
      }
    }
    this.changeIngredientsEvent.next(this.ingredients);
  }

  updateIngredient(index: number, existingIngredient: Ingredient) {
    this.ingredients[index] = existingIngredient;
    this.changeIngredientsEvent.next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.changeIngredientsEvent.next(this.ingredients);
  }
}
