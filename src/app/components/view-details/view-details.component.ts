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
    this.listService.getUserComments().subscribe(getComents=>{
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
      console.log(this.comments)
      console.log('formValue',{name:'user3',
      description:this.createPostForm.get('description')?.value})
      this.createPostForm.reset();
    } else {
      this.createPostForm.markAllAsTouched();
      return;
    }
  }


}


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';
// import { CommentService } from '../../services/comment.service';
// import { Auth } from '@angular/fire/auth';

// @Component({
//   selector: 'app-view-details',
//   standalone: true,
//   imports: [ReactiveFormsModule,
//     FormsModule,NgFor,NgIf],
//   templateUrl: './view-details.component.html',
//   styleUrl: './view-details.component.scss'
// })
// export class ViewDetailsComponent implements OnInit {

//   createPostForm: FormGroup;
//   comments: any[] = [];
//   userId: string | null = null;
//   userName: string | null | undefined;

//   constructor(
//     private readonly fb: FormBuilder,
//     private readonly commentService: CommentService,
//     private readonly auth: Auth
//   ) {
//     this.createPostForm = this.fb.group({
//       description: ['', [Validators.required]],
//     });
//   }

//   ngOnInit(): void {
//     this.auth.onAuthStateChanged(user => {
//       if (user) {
//         this.userId = user.uid;
//         this.userName = user.displayName
//         console.log(this.userName)
//         this.loadUserComments(this.userId);
//       }
//     });
//   }

//   loadUserComments(userId: string): void {
//     this.commentService.getUserComments(userId).subscribe(fetchedComments => {
//       this.comments = fetchedComments;
//       console.log('Fetched comments:', this.comments);
//     });
//   }

//   onSubmit(): void {
//     if (this.createPostForm.valid) {
//       const description = this.createPostForm.get('description')?.value;

//       if (this.userId) {
//         this.commentService.saveUserComment(this.userId, 'user3', description).then(() => {
//           console.log(this.userId)
//           console.log('Comment saved successfully');
//           this.loadUserComments(this.userId!); 
//           this.createPostForm.reset();
//         }).catch(error => {
//           console.error('Error saving comment:', error);
//         });
//       } else {
//         console.error('User is not authenticated');
//       }
//     } else {
//       this.createPostForm.markAllAsTouched();
//     }
//   }
// }
