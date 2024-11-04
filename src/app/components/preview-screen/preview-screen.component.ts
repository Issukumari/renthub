import { Component } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  constructor(private readonly listService: ListingService) { }

  ngOnInit(): void {
    this.listService.getPrviewData().subscribe(previewData=>{
      this.propertyPreviewData=previewData[0]

    })

  }
}
