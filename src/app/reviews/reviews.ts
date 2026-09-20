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
  deleteStatus:boolean = false;
  deleteId: number | null = null;

  edit(id: number) {
    this.router.navigate(['/edit-review', id]);
  }

  delete(id: number) {
    this.deleteId = id;
    this.deleteStatus = true;
  }

  cancel(){
    this.deleteStatus = false;
    this.deleteId = null;
  }

  confirm(){
    if (this.deleteId !== null) {
      this.bs.deleteOne(this.deleteId.toString())
      .then(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.bs.getUserReviews(user.id);
      })
      .then(response => {
        this.reviews = response;
        this.deleteStatus = false;
        this.deleteId = null;
        this.cdr.detectChanges();
          
      });
    }
  }
}
