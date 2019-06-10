import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editRecipeForm: FormGroup;
  // editRecipeFormArray: FormArray;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.editMode = params.id != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    console.log(this.editRecipeForm);
  }

  onAddIngredient() {
    (this.editRecipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
    console.log(this.editRecipeForm);
  }

  getIngredientsFormArray(): AbstractControl[] {
    return (this.editRecipeForm.get('ingredients') as FormArray).controls;
  }

  onSaveRecipe() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editRecipeForm.value);
    } else {
      this.recipeService.addRecipe(this.editRecipeForm.value);
    }
    this.redirectToParent();
  }

  onClearRecipe() {
    this.redirectToParent();
  }

  onDeleteIngredient(index: number) {
    (this.editRecipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipe = new Recipe(null, null, 'https://picsum.photos/640/480', []);
    if (this.editMode) {
      recipe = this.recipeService.getRecipeById(this.id);
    }
    this.editRecipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': new FormArray([])
    });

    for (let i = 0; i < recipe.ingredients.length; i++) {
      (this.editRecipeForm.get('ingredients') as FormArray).push(new FormGroup({
        'name': new FormControl(recipe.ingredients[i].name, Validators.required),
        'amount': new FormControl(recipe.ingredients[i].amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
    }
  }

  private redirectToParent() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
