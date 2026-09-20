import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reviews } from './reviews/reviews';
import { Login } from './login/login';
import { AddReview } from './add-review/add-review';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', component:Home },
    { path: 'reviews', component: Reviews },
    { path: 'login', component: Login },
    { path: 'add-review', component: AddReview },
    { path: 'edit-review/:id', component: AddReview },
 { path: 'register', component: Register }

];
