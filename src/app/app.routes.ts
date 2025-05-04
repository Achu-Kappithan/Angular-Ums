import { Routes } from '@angular/router';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import { LoginComponent } from './features/auth/components/login/login.component'
import { AdminLoginComponent } from './features/auth/components/admin-login/admin-login.component';
import { AdminDashbordComponent } from './features/admin/components/admin-dashbord/admin-dashbord.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: "signup", component : SignupComponent },
    { path: 'profile', component: UserProfileComponent},
    { path: 'login', component : LoginComponent},
    { path: 'admin/login',component : AdminLoginComponent},
    { path: 'admin/dashbord', component : AdminDashbordComponent}

];
