import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Backend } from '../shared/backend';
import { Router } from '@angular/router'; //Weiterleitung zum Login


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})


export class Register {
//erstellt Registrierungsformular 
  form = new FormGroup({
    emailControl: new FormControl<string> ('', [
      Validators.required,
      Validators.email
    ]),

    passwordControl: new FormControl<string> ('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

//Backend und Router werden in d. Komponente eingebunden
  constructor(
    private backend: Backend,
  private router: Router) {}
//Speichert eine mögliche Fehlermeldung. Am Anfang gibt es keine Fehlermeldung
  errorMessage = '';
  showPassword = false;
  
  async register() {
//prüft, ob d. Formular ungültig ist
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

//holt d. eingebundene E-Mail aus dem Formular
    const email = this.form.value.emailControl ?? '';
    // so auch Passwort 
    const password = this.form.value.passwordControl ?? '';
    
    try {
      //schickt an Backend u. wartet auf Antwort
    const user = await this.backend.register(email, password);
//gibt d. registrierten Benutzer i. d. Konsole aus Dienst hauptsächlich zum Testen während d. Entwicklung
    console.log('Registrierter User:', user);
    this.router.navigate(['/login']); //Nach erfolgreicher Registrierung zur Login-Seite
  } catch (error) {
    this.errorMessage = 'E-Mail bereits registriert'; //wenn Fehler
  }
  }
}