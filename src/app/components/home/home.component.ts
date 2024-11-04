import { Component } from '@angular/core';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listing.service';
import {NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from '../carousel/carousel.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,NgIf,
    ReactiveFormsModule,
    FormsModule,CarouselComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  highLightingData: any[] = []; 

  highlightedListings: Listing[] = [];
  paginatedListings: Listing[] = [];
  originalListings: Listing[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  
  searchQuery: string = ''; 
  priceRange: number[] = [0, 5000];
  selectedAmenities: string[] = []; 

  amenities: string[] = ['Wi-Fi', 'Air Conditioning', 'Parking', 'Gym Access', 'Swimming Pool']; 
  favourateData: any={};

  constructor(private readonly listingService: ListingService,
    private readonly router: Router

  ) {}

  ngOnInit(): void {
    this.loadHighlightedListings();
    this.loadPaginatedListings(this.currentPage);
  }

  loadHighlightedListings() {

    this.listingService.getHighlightedListings().subscribe((listings: Listing[]) => {
      this.highlightedListings = listings;
    });
  }

  loadPaginatedListings(page: number) {
    this.listingService.getPaginatedListings(page).subscribe(response => {
      this.paginatedListings = response.listings;
      this.originalListings = [...this.paginatedListings];
      this.totalPages = response.totalPages;
    });
  }

  filterListings() {
    let filteredListings = [...this.originalListings];
      if (this.searchQuery) {
      filteredListings = filteredListings.filter(listing => 
        listing.location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    if (this.priceRange[0] !== null && this.priceRange[1] !== null &&
        this.priceRange[0] !== undefined && this.priceRange[1] !== undefined) {
  
      filteredListings = filteredListings.filter(listing => 
        listing.price >= this.priceRange[0] && listing.price <= this.priceRange[1]
      );
  
      if (filteredListings.length === 0) {
        this.paginatedListings = []; 
        return; 
      }
    }
  
    if (this.selectedAmenities.length > 0) {
      filteredListings = filteredListings.filter(listing =>
        this.selectedAmenities.every(amenity => listing.amenities.includes(amenity))
      );
    }
  
    this.paginatedListings = filteredListings;
  }
    toggleAmenity(amenity: string): void {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
    this.filterListings();
  }

  changePage(page: number) {
    this.currentPage = page;
  
    this.searchQuery = ''; 
    this.priceRange = [0, 0];
    this.selectedAmenities = []; 
      this.loadPaginatedListings(page);
  }

  markAsFavorite(listingId: number) {
    console.log('markAsFavorite')
    this.listingService.markAsFavorite(listingId).subscribe(() => {
        const listing = this.highlightedListings.find(l => l.id === listingId);
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
