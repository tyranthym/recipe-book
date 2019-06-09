import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') editIngredientForm: NgForm;
  // edit mode only
  isEditMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;
  editIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editIngredientSub = this.shoppingListService.editIngredientEvent.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.editedIngredientIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.editIngredientForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      });
  }

  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
  }

  onAddIngredient() {
    const value = this.editIngredientForm.value;
    const ingredient = new Ingredient(value.name, Number(value.amount));
    this.shoppingListService.mergeIngredient(ingredient);
    this.editIngredientForm.resetForm();
  }

  onEditIngredient() {
    const value = this.editIngredientForm.value;
    this.editedIngredient.name = value.name;
    this.editedIngredient.amount = +value.amount;
    this.shoppingListService.updateIngredient(this.editedIngredientIndex, this.editedIngredient);
    this.editIngredientForm.resetForm();
    this.resetEditStatus();
  }

  onClearIngredient() {
    this.editIngredientForm.resetForm();
    if (this.isEditMode) {
      this.resetEditStatus();
    }
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.editIngredientForm.resetForm();
    this.resetEditStatus();
  }

  // quit the edit mode
  private resetEditStatus() {
    this.isEditMode = false;
    this.editedIngredientIndex = null;
    this.editedIngredient = null;
  }
}
