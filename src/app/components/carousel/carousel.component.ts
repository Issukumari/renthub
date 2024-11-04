import { Component, Input } from '@angular/core';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';
import { Router, RouterModule } from '@angular/router';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterModule,ViewDetailsComponent,NgIf],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  constructor(private readonly listingService: ListingService,
    private readonly router: Router
  ) {}
  highLightingData: any[] = []; 
  @Input() listings: Listing[] = [];
  images: any[] = [];
  ngOnInit(): void {
    this.images = this.listings.map(listing => listing.imageUrl);
  }
  currentIndex: number = 0;

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  markAsFavorite(listingId: number) {
    this.listingService.markAsFavorite(listingId).subscribe(() => {
        const listing = this.listings.find(l => l.id === listingId);
      if (listing) {
        listing.isFavourite = !listing.isFavourite;
      } 
    });
  }
  
  
    viewDetails(id: number) {
      this.router.navigate([`details/${id}`]);
      console.log('View details for listing', id);
  }
}
