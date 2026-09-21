import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Backend } from '../shared/backend';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form = new FormGroup({
    emailControl: new FormControl<string> ('', [
      Validators.required,
      Validators.email
    ]),

    passwordControl: new FormControl<string> ('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });
  constructor(
    private backend: Backend,
  private router: Router) {}

  errorMessage = '';
  showPassword = false;
  
  async register() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.emailControl ?? '';
    const password = this.form.value.passwordControl ?? '';
    
    try {
    const user = await this.backend.register(email, password);

    console.log('Registrierter User:', user);
    this.router.navigate(['/login']);
  } catch (error) {
    this.errorMessage = 'E-Mail bereits registriert';
  }
  }
}
