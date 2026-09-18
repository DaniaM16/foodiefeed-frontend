import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';
import { ActivatedRoute, Router } from '@angular/router';
import { Reviews } from '../reviews/reviews';

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css',
})
export class AddReview {

  constructor(
    private backend: Backend,
    private route : ActivatedRoute,
    private router: Router 
  ) {}

  id: string | null = ''

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID aus URL:', this.id);
    
    if (this.id) {
      this.backend.getOne(this.id)
      .then(review => {
        console.log('Geladenes Review', review);
        this.form.patchValue({
          nameControl: review.name,
          categoryControl: review.category,
          districtControl: review.district,
          ratingControl: review.rating.toString(),
          commentControl: review.comment,
          dateControl: review.visit_date,
          recommendControl:review.recommended
        });
      });
    }
  }


  form = new FormGroup({
    nameControl: new FormControl<string>(''),
    categoryControl: new FormControl<string>(''),
    districtControl: new FormControl<string>(''),
    ratingControl: new FormControl<string>(''),
    commentControl: new FormControl<string>(''),
    dateControl: new FormControl<string>(''),
    recommendControl: new FormControl<boolean>(false),
  });

  async save() {

    const review = {
      user_id: 1,
      name: this.form.value.nameControl ?? '',
      category: this.form.value.categoryControl ?? '',
      district: this.form.value.districtControl ?? '',
      rating: Number(this.form.value.ratingControl),
      comment: this.form.value.commentControl ?? '',
      recommended: this.form.value.recommendControl ?? false,
      visit_date: this.form.value.dateControl ?? ''
    };

    if (this.id) {
      await this.backend.updateOne(this.id, review);
    } else {
      await this.backend.create(review);
    }

    this.router.navigate(['/reviews']);
  }
}
