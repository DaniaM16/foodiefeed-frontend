import { Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Review } from '../shared/review';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reviews',
  imports: [RouterLink],
templateUrl: './reviews.html',
styleUrl: './reviews.css'
})
export class Reviews implements OnInit{

  private bs = inject(Backend)
  reviews: Review[] = [];

  ngOnInit(): void {
    this.bs.getAll()
    .then(response => this.reviews = response)
    .then(reviews => console.log(' Reviews in Reviews-Komponente: ', reviews ))  ; 
  }
}