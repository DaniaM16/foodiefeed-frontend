import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css',
})
export class AddReview {

  constructor(private backend: Backend) {}

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

    await this.backend.create(review);
  }
}
