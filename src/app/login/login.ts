import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms' // für Formular und Überprüfung der Eingaben
import { Backend } from '../shared/backend';
import { RouterLink } from '@angular/router'; // Link zur Registrierung
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

  form = new FormGroup({ // erstellt Login Formular
    emailControl: new FormControl<string>('',[ //eingabefeld darf nicht leer und muss gültig sein
      Validators.required, 
      Validators.email
    ]),
    passwordControl: new FormControl<string>('',[ //Eingabefeld Passwort
      Validators.required,
      Validators.minLength(4)
    ])
  });

  errorMessage = ''; // speichert mögliche fehlermeldung bei login
  showPassword = false; 
  

  async login() { // wird beim Einloggen ausgeführt

    if (this.form.invalid) { //Prüft ob Formular ungültig ist damit FM angezeigt wird
      this.form.markAllAsTouched();
      return;
    }
    // Holt Passwort und Email aus Formular
    const email = this.form.value.emailControl ?? '';
    const password = this.form.value.passwordControl ?? '';

    try {

    const result = await this.backend.login(email, password);
    
      //speichert Daten und token des Users
    localStorage.setItem('user', JSON.stringify(result.user)); 
    localStorage.setItem('token', result.token);

    this.router.navigate(['/reviews']); // nach erfolgreichem login

    } catch (error) {

      this.errorMessage = 'Login fehlgeschlagen. Email oder Passwort falsch.';
    }

  }
}
