import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { MinIntegerDirective } from './CustomValidator/min-integer.directive';
import { MaxIntegerDirective } from './CustomValidator/max-integer.directive';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective,
        MinIntegerDirective,
        MaxIntegerDirective,
        LoaderComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        MinIntegerDirective,
        MaxIntegerDirective,
        LoaderComponent,
        AlertComponent,
        PlaceholderDirective,
        CommonModule
    ],
    entryComponents: [
        AlertComponent
    ]
})
export class SharedModule {
}
