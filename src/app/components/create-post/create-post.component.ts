import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyLettersValidator } from '../lettersvalidator';
import {NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [NgFor,NgIf,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  createPostForm: FormGroup;
  sharedPropertyOption: string[] = ['Yes', 'No']; 
  stayOrLeaseTypeOption: string[] = ['LongTerm (6+ month)', 'ShortTerm', 'Both']; 
  selectedAmenities: string[] = []; 
  priceTypeOption: string[] = ['Negotiable Price Mode', 'Per Month', 'Utilities included in Rent'];
  furnished: string[] = ['Yes', 'No']; 
  amenities: string[] = [
    'Wi-Fi', 'Air Conditioning', 'Parking', 'Gym Access', 
    'Swimming Pool', 'Car Park', 'Visitor Parking', 
    'Library Service', 'ClubHouse'
  ]; 
  dropdownOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  constructor(private readonly fb: FormBuilder) {
    this.createPostForm = this.fb.group({
      selectedOption: ['', Validators.required],
      name: ['',[Validators.required,OnlyLettersValidator()]],
      propertyLocation: ['', [Validators.required]],
      sharedProperty: ['', Validators.required],
      propertyDetails: ['', Validators.required],
      stayOrLeaseType: [''],
      priceType: [''],
      furnishedFlat: ['', Validators.required],
      expectedRent: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      title: ['',Validators.required],
      description: ['',Validators.required],
    });
  }

  toggleAmenity(amenity: string): void {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
    console.log(this.selectedAmenities);
  }

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const formValue = this.createPostForm.value;
      const submissionData = {
        ...formValue,
        amenities: this.selectedAmenities
      };
      console.log(submissionData)
      this.createPostForm.reset();
      this.selectedAmenities = [];
    } else {
      this.createPostForm.markAllAsTouched();
      return;
    }
  }
}



// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { OnlyLettersValidator } from '../lettersvalidator';
// import { NgFor, NgIf } from '@angular/common';
// import { ListingService } from '../../services/listing.service';
// import { CommentService } from '../../services/comment.service';

// @Component({
//   selector: 'app-create-post',
//   standalone: true,
//   imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule,],
//   templateUrl: './create-post.component.html',
//   styleUrl: './create-post.component.scss'
// })
// export class CreatePostComponent {
//   createPostForm: FormGroup;
//   sharedPropertyOption: string[] = ['Yes', 'No'];
//   stayOrLeaseTypeOption: string[] = ['LongTerm (6+ month)', 'ShortTerm', 'Both'];
//   selectedAmenities: string[] = [];
//   priceTypeOption: string[] = ['Negotiable Price Mode', 'Per Month', 'Utilities included in Rent'];
//   furnished: string[] = ['Yes', 'No'];
//   amenities: string[] = [
//     'Wi-Fi', 'Air Conditioning', 'Parking', 'Gym Access',
//     'Swimming Pool', 'Car Park', 'Visitor Parking',
//     'Library Service', 'ClubHouse'
//   ];
//     dropdownOptions = [
//     { value: '1', label: 'Option 1' },
//     { value: '2', label: 'Option 2' },
//     { value: '3', label: 'Option 3' }
//   ];

//   constructor(
//     private readonly fb: FormBuilder,
//     private readonly listService: ListingService,
//     private readonly commentService: CommentService,

//   ) {
//     this.createPostForm = this.fb.group({
//       selectedOption: ['', Validators.required],
//       name: ['', [Validators.required, OnlyLettersValidator()]],
//       propertyLocation: ['', [Validators.required]],
//       sharedProperty: ['', Validators.required],
//       propertyDetails: ['', Validators.required],
//       stayOrLeaseType: [''],
//       priceType: [''],
//       furnishedFlat: ['', Validators.required],
//       expectedRent: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }

//   toggleAmenity(amenity: string): void {
//     const index = this.selectedAmenities.indexOf(amenity);
//     if (index === -1) {
//       this.selectedAmenities.push(amenity);
//     } else {
//       this.selectedAmenities.splice(index, 1);
//     }
//     console.log(this.selectedAmenities);
//   }

//   onSubmit(): void {
//     if (this.createPostForm.valid) {
//       const formValue = this.createPostForm.value;
//       const submissionData = {
//         ...formValue,
//         amenities: this.selectedAmenities // Ensure amenities is an array
//       };

//       this.commentService.savePost(submissionData).subscribe({
//         next: () => {
//           console.log('Post saved successfully');
//           this.createPostForm.reset();
//           this.selectedAmenities = [];
//         },
//         error: (error) => {
//           console.error('Error saving post:', error);
//         }
//       });
//     } else {
//       this.createPostForm.markAllAsTouched();
//       return;
//     }
//   }
// }
