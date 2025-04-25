import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import {  ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard'; 
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'home', 
    component: HomeComponent },
  { path: 'about', 
    component: AboutComponent },
  { path: 'contact', 
    component: ContactComponent },
  { path: 'login', 
    component: LoginComponent },
  { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' },
  { path: 'profile', 
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  { path: 'register',
    component: RegisterComponent 
  }
];