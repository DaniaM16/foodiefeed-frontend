import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { email } from '@angular/forms/signals';
import { Backend } from '../shared/backend';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private backend: Backend,
    private router: Router 
  ) {}

  form = new FormGroup({
    emailControl: new FormControl<string>('',[
      Validators.required,
      Validators.email
    ]),
    passwordControl: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(8)
    ])
  });

  errorMessage = '';
  showPassword = false;
  

  async login() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.emailControl ?? '';
    const password = this.form.value.passwordControl ?? '';

    try {

    const result = await this.backend.login(email, password);

    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);

    this.router.navigate(['/reviews']);
    } catch (error) {

      this.errorMessage = 'Login fehlgeschlagen. Email oder Passwort falsch.';
    }

  }
}
