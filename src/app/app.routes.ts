import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reviews } from './reviews/reviews';
import { Login } from './login/login';
import { AddReview } from './add-review/add-review';
import { Register } from './register/register';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', component:Home },
    { path: 'reviews', component: Reviews, canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'add-review', component: AddReview, canActivate: [authGuard]},
    { path: 'edit-review/:id', component: AddReview, canActivate: [authGuard] },
 { path: 'register', component: Register }

];
