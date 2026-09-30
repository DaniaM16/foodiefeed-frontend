// wird benötigt, um eine Angular-Komponente zu erstellen, OnInit ermöglicht Code beim Starten d. Komponente, Incect bindet benötigte Dienste ein, ChangeDEtectorRef aktualisiert d. Anzeige 
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Review } from '../shared/review';
import { Router, RouterLink } from '@angular/router'; //Router wird für d. Weiterleitung zur Bearbeiten-Seite benötigt
import { DatePipe } from '@angular/common'; //zum Formatieren des Besuchsdatums benötigt


@Component({
  selector: 'app-reviews',
  imports: [RouterLink, DatePipe], //verwendet
templateUrl: './reviews.html',
styleUrl: './reviews.css'
})


export class Reviews implements OnInit{

  private bs = inject(Backend)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef) //bei Change aktualisieren 
  reviews: Review[] = []; //Array, in dem die Reviews des eingeloggten Benutzers gespiechert werden. Am Anfang ist d. Array leer

  ngOnInit(): void { //automatisch aufgeführt, wenn d. Komponente geladen wird
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // holt den eingeloggten Benutzer aus dem localStorage, JSON.parse wandelt den gespeicherten String wieder in ein Objekt um
    console.log('User aus localStorage:', user);
    console.log('User ID:', user.id);
// holt nur d. Reviews des eingeloggten Benutzers aus dem Backend 
    this.bs.getUserReviews(user.id)
    .then(response => {
      this.reviews = response; //speichert d. geladenen Reviews im reviews-Array
      this.cdr.detectChanges(); //aktualisiert am Ende d. ANzeige
    console.log('Reviews von User:', this.reviews);
    }); 
  
}
  deleteStatus:boolean = false; // gibt an, ob d. Löschabfrage gerade angezeigt werden soll
  deleteId: number | null = null; // speichert die ID d. Reviews das gelöscht werden soll, null=keins ausgewählt

  edit(id: number) { //beim Klick auf Bearbeiten
    this.router.navigate(['/edit-review', id]);
  }

  delete(id: number) {
    this.deleteId = id; //merkt, welches Review
    this.deleteStatus = true; //zeigt Sicherheitsabfrage 
  }

  cancel(){ // beim Click auf Abbrechen
    this.deleteStatus = false; //blendet Abfrage wieder aus 
    this.deleteId = null; //entfernt gespiecherte Review-ID
  }

  confirm(){ //wird ausgeführt, wenn d. Löschen bestägt wird
    if (this.deleteId !== null) { //prüft, ob wirklich eine Review-ID vorhanden ist
      this.bs.deleteOne(this.deleteId.toString()) //löscht d. ausgewählte Review über das Backend. Die ID wird vorher von einer Zahl in einen String umgewandelt 
      .then(() => { //...wird eurneut d. eingeloggte Benutzer geholt
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.bs.getUserReviews(user.id);
      })
      .then(response => { //...wenn die neuen geladen wurden
        this.reviews = response; //..wird aktualisiert 
        this.deleteStatus = false; //wieder schließen
        this.deleteId = null; //gespeicherte ID wieder zurücksetzen 
        this.cdr.detectChanges(); //aktualisiert die Anzeige
          
      });
    }
  }
}
