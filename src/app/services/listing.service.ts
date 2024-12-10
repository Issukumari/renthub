import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Listing, PaginatedResponse } from '../models/listing.model';
import { propertyPreviewData, Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
   listings: Listing[] = [
    {
      id: 1,
      title: 'Cozy Apartment in City Center',
      location: 'mumbai',
      price: 1500,
      amenities: ['Wi-Fi', 'Air Conditioning', 'Parking'],
      imageUrl: 'assets/cozy-apartment.png',
      description: 'A cozy 2-bedroom apartment is located in mumbai. it is also called as the heart of the city with easy access to public transport.',
      isHighlighted: false,
      isFavourite: false
    },
    {
      id: 2,
      title: 'Spacious Apartment Near Park',
      location: 'hyderabad',
      price: 1200,
      amenities: ['Wi-Fi', 'Gym Access', 'Pet Friendly'],
      imageUrl: 'assets/spacious.jpg',
      description: 'Spacious apartment with a park view and modern amenities, perfect for a small family.',
      isHighlighted: false,
      isFavourite: false
    },
    {
      id: 3,
      title: 'Modern Studio Apartment Center',
      location: 'chennai',
      price: 1000,
      amenities: ['Wi-Fi', 'Gym Access', 'Swimming Pool'],
      imageUrl: 'assets/modern-studio.jpg',
      description: 'A modern studio apartment with a great view and close proximity to shops and restaurants.',
      isHighlighted: false,
      isFavourite: false
    },
    {
      id: 4,
      title: 'Luxury Penthouse',
      location: 'bangalore',
      price: 3000,
      amenities: ['Wi-Fi', 'Private Pool', 'Concierge'],
      imageUrl: 'assets/spacious.jpg',
      description: 'A luxury penthouse with top-notch facilities and services in a prime location.',
      isHighlighted: false,
      isFavourite: false
    },
  ];

   users: Users[] = [
    {
      name: 'user1',
      description: 'A cozy 2-bedroom apartment located in the heart of the city with easy access to public transport.',
    },
    {
      name: 'user2',
      description: 'A cozy  is a spacious apartment with a park view and modern amenities, perfect for a small family.',
    },
  ];

   previewData: propertyPreviewData[] = [
    {
      propertyType: 'Apartment',
      numberOfBeds: '2',
      address: 'Downtown, City A',
      rent: 1500,
      description: 'A cozy 2-bedroom apartment located in the heart of the city with easy access to public transport.',
      amenities: ['Wi-Fi', 'Air Conditioning', 'Parking'],
      imageUrl: ['assets/Image 910.jpg','assets/AllPlant_Protein@3x.png','assets/Image 612.png','assets/Image 898.jpg'],
    },
    {
      propertyType: 'Building',
      numberOfBeds: '3',
      address: 'Suburb, City B',
      rent: 1200,
      description: 'Spacious apartment with a park view and modern amenities, perfect for a small family.',
      amenities: ['Wi-Fi', 'Gym Access', 'Pet Friendly'],
      imageUrl: ['assets/Image 910.jpg','assets/AllPlant_Protein@3x.png','assets/Image 612.png','assets/Image 898.jpg'],
    },
    {
      propertyType: 'Apartment',
      numberOfBeds: '1',
      address: 'Midtown, City A',
      rent: 1000,
      description: 'A modern studio apartment with a great view and close proximity to shops and restaurants.',
      amenities: ['Wi-Fi', 'Gym Access', 'Swimming Pool'],
      imageUrl: ['assets/Image 910.jpg','assets/AllPlant_Protein@3x.png','assets/Image 612.png','assets/Image 898.jpg'],
    },
    {
      propertyType: 'Building',
      numberOfBeds: '4',
      address: 'Uptown, City C',
      rent: 3000,
      description: 'A luxury penthouse with top-notch facilities and services in a prime location.',
      amenities: ['Wi-Fi', 'Private Pool', 'Concierge'],
      imageUrl: ['assets/Image 910.jpg','assets/AllPlant_Protein@3x.png','assets/Image 612.png','assets/Image 898.jpg'],
    },
  ];

  constructor() { }

  getPaginatedListings(page: number): Observable<PaginatedResponse> {
    const listingsPerPage = 3;
    const startIndex = (page - 1) * listingsPerPage;
    const paginatedListings = this.listings.slice(startIndex, startIndex + listingsPerPage);
    const totalPages = Math.ceil(this.listings.length / listingsPerPage);

    return of({ listings: paginatedListings, totalPages });
  }

  markAsFavorite(listingId: number): Observable<{listing: any | null }> {
    const listing = this.listings.find(l => l.id === listingId);
    if (listing) {      
      return of({listing });
    } else {
      return of({listing: null });
    }
  }
  

  getListingDetails(listingId: number): Observable<Listing | undefined> {
    const listing = this.listings.find(l => l.id === listingId);
    return of(listing);
  }

  getHighlightedListings(): Observable<Listing[]> {
    console.log(this.listings)
    const highlighted = this.listings.slice(0, 5); // Change as needed
    return of(highlighted);
  }

  getUserComments(){
    return of(this.users);
  }
  getPrviewData(){
    return of(this.previewData);
  }
}
