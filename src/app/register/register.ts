import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form = new FormGroup({
    emailControl: new FormControl<string> (''),
    passwordControl: new FormControl<string> ('')
  });
  constructor(private backend: Backend) {}

  async register() {
    const email = this.form.value.emailControl ?? '';
    const password = this.form.value.passwordControl ?? '';

    const user = await this.backend.register(email, password);

    console.log('Registrierter User:', user);
  }
}
