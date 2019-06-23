import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const authRoutes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(authRoutes)
    ]
})
export class AuthModule {
}
