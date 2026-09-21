import { Injectable } from '@angular/core';
import { Review } from './review';
import { Reviews } from '../reviews/reviews';
import { form } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root'
})
export class Backend {
  apiURL = 'http://localhost:3000';

  constructor() { }

  async getAll(): Promise<Review[]> {
    let response = await fetch(this.apiURL + '/reviews');
    let reviews = await response.json();
    console.log('Reviews aus dem Backend: ', reviews)
    return reviews;
  }

async getUserReviews(userId: number): Promise<Review[]> {
  const token = localStorage.getItem('token');

  let response = await fetch(this.apiURL + '/users/' + userId + '/reviews', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  let reviews = await response.json();
  return reviews;
}

  async getOne(id: string): Promise<Review> {
    let response = await fetch(this.apiURL + '/reviews/' + id);
    let review = await response.json();
    return review;
  }
  async create(review: Review, image: File | null): Promise<Review> {
    const formData = new FormData();

    formData.append('user_id', review.user_id!.toString());
    formData.append('name', review.name);
    formData.append('category', review.category);
    formData.append('district', review.district);
    formData.append('rating', review.rating.toString());
    formData.append('comment', review.comment);
    formData.append('recommended', review.recommended.toString());
    formData.append('visit_date',review.visit_date);

    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('token');

    let response = await fetch(this.apiURL + '/reviews', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token 
      },
      body: formData
    });

    let newReview = await response.json();
    return newReview;
  }

  async deleteOne(id: string): Promise<{message: string}> {
    const token = localStorage.getItem('token');

    let response = await fetch(this.apiURL + '/reviews/' + id, {
      method: "DELETE",
      headers:{
        'Authorization': 'Bearer ' + token
      }
    });

    let message = await response.json();
    console.log('message in service (deleteOne) : ', message)
    return message;
  }

  async updateOne(id: string, review: Review, image: File | null): Promise<Review> {
    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('name', review.name);
    formData.append('category', review.category);
    formData.append('district', review.district);
    formData.append('rating', review.rating.toString());
    formData.append('comment', review.comment);
    formData.append('recommended', review.recommended.toString());
    formData.append('visit_date', review.visit_date);

    if (image) {
      formData.append('image', image);
    }

    let response = await fetch(this.apiURL + '/reviews/' + id, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: formData
    });
    let updatedReview = await response.json();
    return updatedReview;
  }

  async login(email: string, password: string): Promise<any> {
    let response = await fetch(this.apiURL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    } );

    if (!response.ok) {
      throw new Error('Login fehlgeschlagen. E-Mail oder Passwort falsch.')
    }

    let user = await response.json();

    return user;
  }

  async register(email: string, password: string): Promise<any> {

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

    let user = await response.json();

    return user;

  }


}