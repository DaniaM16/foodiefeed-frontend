import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar { // bindet Router ein, damit man später zu einer anderen Seite wechseln kann
  constructor(private router: Router) {}

  isLoggedIn():boolean {
    return localStorage.getItem('user') !== null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
