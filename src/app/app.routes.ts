import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reviews } from './reviews/reviews';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component:Home },
    { path: 'reviews', component: Reviews },
    { path: 'login', component: Login }
];
