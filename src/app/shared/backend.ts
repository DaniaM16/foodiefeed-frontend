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
}