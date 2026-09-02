import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css',
})
export class AddReview {

  form = new FormGroup({
    nameControl: new FormControl<string>(''),
    categoryControl: new FormControl<string>(''),
    districtControl: new FormControl<string>(''),
    ratingControl: new FormControl<string>(''),
    commentControl: new FormControl<string>(''),
    dateControl: new FormControl<string>(''),
    recommendControl: new FormControl<boolean>(false),
  });
}
