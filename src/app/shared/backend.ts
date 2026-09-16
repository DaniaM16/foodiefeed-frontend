import { Injectable } from '@angular/core';
import { Review } from './review';

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
}