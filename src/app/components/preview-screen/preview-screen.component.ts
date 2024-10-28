import { Component } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-preview-screen',
  standalone: true,
  imports: [NgFor,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './preview-screen.component.html',
  styleUrl: './preview-screen.component.scss'
})
export class PreviewScreenComponent {
  propertyPreviewData: any= [];
  // posts: any = [];
  constructor(private readonly listService: ListingService,private readonly commentService:CommentService) { }

  ngOnInit(): void {
    this.listService.getPrviewData().subscribe(previewData=>{
      this.propertyPreviewData=previewData[0]
      console.log(this.propertyPreviewData.imageUrl)

    })
    // this.commentService.getPosts().subscribe({
    //   next: (data) => {
    //     this.propertyPreviewData = data;
    //     console.log('Fetched posts:', data);
    //   },
    //   error: (error) => console.error('Error fetching posts:', error),
    // });
  }
}
