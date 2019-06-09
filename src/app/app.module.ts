import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRountingModule } from './app-rounting.module';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { MinIntegerDirective } from './shared/CustomValidator/min-integer.directive';
import { MaxIntegerDirective } from './shared/CustomValidator/max-integer.directive';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      RecipesComponent,
      RecipeStartComponent,
      RecipeListComponent,
      RecipeDetailComponent,
      RecipeItemComponent,
      RecipeEditComponent,
      ShoppingListComponent,
      ShoppingEditComponent,
      DropdownDirective,
      MinIntegerDirective,
      MaxIntegerDirective
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRountingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
