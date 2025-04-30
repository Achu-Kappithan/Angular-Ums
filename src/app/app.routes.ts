import { Routes } from '@angular/router';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import { LoginComponent } from './features/auth/components/login/login.component'

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: "signup", component : SignupComponent },
    { path: 'profile', component: UserProfileComponent},
    { path: 'login', component : LoginComponent}
];
