import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { email } from '@angular/forms/signals';
import { Backend } from '../shared/backend';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private backend: Backend) {}

  form = new FormGroup({
    emailControl: new FormControl<string>(''),
    passwordControl: new FormControl<string>('')
  });

  async login() {
    const email = this.form.value.emailControl ?? '';
    const password = this.form.value.passwordControl ?? '';

    const user = await this.backend.login(email, password);

    console.log('Eingeloggter User:', user);

  }
}
