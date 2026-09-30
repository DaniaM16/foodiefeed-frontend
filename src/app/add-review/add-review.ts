import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Backend } from '../shared/backend';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.html',
  styleUrl: './add-review.css',
})
export class AddReview {

  constructor(  // die drei werden in Komponente eingebunden
    private backend: Backend,
    private route : ActivatedRoute,
    private router: Router 
  ) {}

  id: string | null = null;

selectedFile: File | null = null; /* speichert Bild */

onFileSelected(event: Event) {  // wird aufgerufen, wenn ein Bild ausgewählt wird
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {  // prüft, ob Datei ausgewählt wurde
    this.selectedFile = input.files[0]; // speichert Bild
  }
}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID aus URL:', this.id);
    
    if (this.id) {  // wenn ID vorhanden ist, wird ein bestehendes Review bearbeitet
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
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const review = {
      user_id: JSON.parse(localStorage.getItem('user') || '{}').id,
      name: this.form.value.nameControl ?? '',
      category: this.form.value.categoryControl ?? '',
      district: this.form.value.districtControl ?? '',
      rating: Number(this.form.value.ratingControl),
      comment: this.form.value.commentControl ?? '',
      recommended: this.form.value.recommendControl ?? false,
      visit_date: this.form.value.dateControl ?? ''
    };

    if (this.id) { // wenn ID vorhanden ist, bearbeiten wir vorhandenes Review
      await this.backend.updateOne(this.id, review, this.selectedFile);
    } else {
      await this.backend.create(review, this.selectedFile);
    }

    this.router.navigate(['/reviews']);
  }
}
