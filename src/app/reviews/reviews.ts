import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Review } from '../shared/review';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reviews',
  imports: [RouterLink, DatePipe],
templateUrl: './reviews.html',
styleUrl: './reviews.css'
})
export class Reviews implements OnInit{

  private bs = inject(Backend)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef)
  reviews: Review[] = [];

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.bs.getUserReviews(user.id)
    .then(response => {
      this.reviews = response;
      this.cdr.detectChanges();
    console.log('Reviews von User:', this.reviews);
    }); 
  
}
  delete(id: number) {
    const sicher = confirm('Möchtest du dieses Review nun wirklich löschen?')

    if(sicher) { 
    this.bs.deleteOne(id.toString())
    .then(() =>  { 
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return this.bs.getUserReviews(user.id);
  })
  .then(response => {
this.reviews = response;
this.cdr.detectChanges();
  });
}
  
}
