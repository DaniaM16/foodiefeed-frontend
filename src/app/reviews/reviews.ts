import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Review } from '../shared/review';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reviews',
  imports: [RouterLink],
templateUrl: './reviews.html',
styleUrl: './reviews.css'
})
export class Reviews implements OnInit{

  private bs = inject(Backend)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef)
  reviews: Review[] = [];

  ngOnInit(): void {
    this.bs.getAll()
    .then(response => {
      this.reviews = response;
      this.cdr.detectChanges();
     console.log('Reviews in Reviews-Komponente: ', this.reviews); 
  });
}
  delete(id: number) {
    this.bs.deleteOne(id.toString())
    .then(() => this.bs.getAll())
    .then(response => this.reviews = response);
  }
  edit(id: number) {
    this.router.navigate(['/edit-review', id]);
  }
}