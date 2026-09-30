import { Injectable } from '@angular/core'; //Injectable wird benötigt, damit diese Klasse als Service in andere Angular-Komponente verwendet werden kann
import { Review } from './review'; //unser datentyp für ein Review

@Injectable({ //Backend-Service steht in d. gesamten Anwendung zur verfügung 
  providedIn: 'root'
})
export class Backend {
  apiURL = 'http://localhost:3000'; //Grundadresse unserer Backends

  constructor() { }

  async getAll(): Promise<Review[]> { //holt alle Reviews aus dem Backend
    let response = await fetch(this.apiURL + '/reviews'); //GET-ANfrage an /reviews
    let reviews = await response.json(); //wandelt die JSON-Antwort in JavaScript Daten um
    console.log('Reviews aus dem Backend: ', reviews) //Ausgabe zum Testen in der Konsole
    return reviews;
  }

async getUserReviews(userId: number): Promise<Review[]> { 
  const token = localStorage.getItem('token');

  let response = await fetch(this.apiURL + '/users/' + userId + '/reviews', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }); //zur Authentifizierung an das BAckend geschickt
  let reviews = await response.json(); //in Java umwandeln
  return reviews;
}

  async getOne(id: string): Promise<Review> { //genau ein Review anhand ID
    let response = await fetch(this.apiURL + '/reviews/' + id); //GET-Anfrage 
    let review = await response.json();
    return review;
  }
  async create(review: Review, image: File | null): Promise<Review> { //erstellt neues Review
    const formData = new FormData(); //FormData wird verwendet, weil neben Textdaten auch eine Bilddatei übertragen werden aknn

    formData.append('user_id', review.user_id!.toString());
    formData.append('name', review.name);
    formData.append('category', review.category);
    formData.append('district', review.district);
    formData.append('rating', review.rating.toString());
    formData.append('comment', review.comment);
    formData.append('recommended', review.recommended.toString());
    formData.append('visit_date',review.visit_date);

    if (image) { //wenn Bild dann auch formData
      formData.append('image', image);
    }

    const token = localStorage.getItem('token'); //Login-Token aus dem Browser holen

    let response = await fetch(this.apiURL + '/reviews', { //POST-Anfrage zum Erstellen eines Reviews
      method: 'POST', //POST = neue Daten erstellen
      headers: {
        'Authorization': 'Bearer ' + token 
      },
      body: formData
    });

    let newReview = await response.json(); //Antwort des Backend umwandeln
    return newReview;
  }

  async deleteOne(id: string): Promise<{message: string}> { //löscht Review anhand ID
    const token = localStorage.getItem('token'); //Login-Token holen

    let response = await fetch(this.apiURL + '/reviews/' + id, {
      method: "DELETE",
      headers:{
        'Authorization': 'Bearer ' + token
      }
    });

    let message = await response.json();
    console.log('message in service (deleteOne) : ', message) //Ausgabe zum Testen
    return message;
  }

  async updateOne(id: string, review: Review, image: File | null): Promise<Review> { //Aktualisiert ein vorhandenes Review
    const token = localStorage.getItem('token'); 

    const formData = new FormData(); //FormData für Review-Daten und Bild erstellen

    formData.append('name', review.name);
    formData.append('category', review.category);
    formData.append('district', review.district);
    formData.append('rating', review.rating.toString());
    formData.append('comment', review.comment);
    formData.append('recommended', review.recommended.toString());
    formData.append('visit_date', review.visit_date);

    if (image) { //neues Bild nur wenn ausgewählt
      formData.append('image', image);
    }

    let response = await fetch(this.apiURL + '/reviews/' + id, { //PUT = vorhandene Daten aktualisieren
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    });
    let updatedReview = await response.json(); //Aktualisiertes Review aus der Antwort holen
    return updatedReview;
  }

  async login(email: string, password: string): Promise<any> { //Schickt Login-Daten an das Backend
    let response = await fetch(this.apiURL + '/login', { //POST-Anfrage an die Login-Route
      method: 'POST', //teilt das BAckend mit, dass JSON geschickt wird
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ //wandelt E-Mail und Passwort in JSON um
        email: email,
        password: password
      })
    } );

    if (!response.ok) { //Wenn d. Anfrage nicht erfolgreich war, wird ein Fehler asugelöst
      throw new Error('Login fehlgeschlagen. E-Mail oder Passwort falsch.')
    }

    let user = await response.json(); //erfolgreiche Antwort in Java

    return user;
  }

  async register(email: string, password: string): Promise<any> { //schickt Registrierungsdaten an Backend

    let response = await fetch(this.apiURL + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (!response.ok) {
      throw new Error('E-Mail bereits registriert');
    }
    let user = await response.json(); //Antwort des Backends umwandeln

    return user;
  }
}