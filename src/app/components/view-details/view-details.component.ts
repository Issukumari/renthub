import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,NgFor,NgIf],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {

  createPostForm: FormGroup;
  priceTypeOption: string[] = ['Negotiable Price Mode', 'Per Month', 'Utilities included in Rent'];
  comments: any[]=[];
 
  constructor(private readonly fb: FormBuilder, private readonly listService:ListingService) {
    this.createPostForm = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.listService.getUserComments()?.subscribe(getComents=>{
      this.comments=getComents
      console.log(getComents)
    })
  }

  onSubmit(): void {
    if (this.createPostForm.valid) {
      const formValue = this.createPostForm.value;
      this.comments.push({
        name:'user3',
        description:this.createPostForm.get('description')?.value
      })
      console.log('formValue',{name:'user3',
      description:this.createPostForm.get('description')?.value})
      this.createPostForm.reset();
    } else {
      this.createPostForm.markAllAsTouched();
      return;
    }
  }


}