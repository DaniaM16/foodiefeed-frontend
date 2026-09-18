import { Injectable } from '@angular/core';
import { Review } from './review';
import { Reviews } from '../reviews/reviews';

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
  async getOne(id: string): Promise<Review> {
    let response = await fetch(this.apiURL + '/reviews/' + id);
    let review = await response.json();
    return review;
  }
  async create(review: Review): Promise<Review> {
    let response = await fetch(this.apiURL + '/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });

    let newReview = await response.json();
    return newReview;
  }
  async deleteOne(id: string): Promise<{message: string}> {
    let response = await fetch(this.apiURL + '/reviews/' + id, {
      method: "DELETE"
    });

    let message = await response.json();
    console.log('message in service (deleteOne) : ', message)
    return message;
  }

  async updateOne(id: string, review: Review): Promise<Review> {
    let response = await fetch(this.apiURL + '/reviews/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
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
    let user = await response.json();

    return user;
  }


}