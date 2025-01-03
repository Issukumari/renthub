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
      location: 'Downtown, City A',
      price: 1500,
      amenities: ['Wi-Fi', 'Air Conditioning', 'Parking'],
      imageUrl: 'assets/Image 910.jpg',
      description: 'A cozy 2-bedroom apartment located in the heart of the city with easy access to public transport.',
      isHighlighted: true,
      isFavourite:false
    },
    {
      id: 2,
      title: 'Spacious Apartment Near Park',
      location: 'Suburb, City B',
      price: 1200,
      amenities: ['Wi-Fi', 'Gym Access', 'Pet Friendly'],
      imageUrl: 'assets/AllPlant_Protein@3x.png',
      description: 'Spacious apartment with a park view and modern amenities, perfect for a small family.',
      isHighlighted: false,
      isFavourite:false

    },
    {
      id: 3,
      title: 'Modern Studio Apartment Center',
      location: 'Midtown, City A',
      price: 1000,
      amenities: ['Wi-Fi', 'Gym Access', 'Swimming Pool'],
      imageUrl: 'assets/Image 612.png',
      description: 'A modern studio apartment with a great view and close proximity to shops and restaurants.',
      isHighlighted: true,
      isFavourite:false

    },
    {
      id: 4,
      title: 'Luxury Penthouse',
      location: 'Uptown, City C',
      price: 3000,
      amenities: ['Wi-Fi', 'Private Pool', 'Concierge'],
      imageUrl: 'assets/Image 898.jpg',
      description: 'A luxury penthouse with top-notch facilities and services in a prime location.',
      isHighlighted: false,
      isFavourite:false
    },
  ];

  users: Users[] = [
    {
      name: 'user1',
      description: 'A cozy 2-bedroom apartment located in the heart of the city with easy access to public transport.',
    },
    {
      name: 'user2',
      description: 'A spacious apartment with a park view and modern amenities, perfect for a small family.',
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
      imageUrl: ['assets/Image 910.jpg', 'assets/AllPlant_Protein@3x.png', 'assets/Image 612.png', 'assets/Image 898.jpg'],
    },
    {
      propertyType: 'Building',
      numberOfBeds: '3',
      address: 'Suburb, City B',
      rent: 1200,
      description: 'Spacious apartment with a park view and modern amenities, perfect for a small family.',
      amenities: ['Wi-Fi', 'Gym Access', 'Pet Friendly'],
      imageUrl: ['assets/Image 910.jpg', 'assets/AllPlant_Protein@3x.png', 'assets/Image 612.png', 'assets/Image 898.jpg'],
    },
    {
      propertyType: 'Apartment',
      numberOfBeds: '1',
      address: 'Midtown, City A',
      rent: 1000,
      description: 'A modern studio apartment with a great view and close proximity to shops and restaurants.',
      amenities: ['Wi-Fi', 'Gym Access', 'Swimming Pool'],
      imageUrl: ['assets/Image 910.jpg', 'assets/AllPlant_Protein@3x.png', 'assets/Image 612.png', 'assets/Image 898.jpg'],
    },
    {
      propertyType: 'Building',
      numberOfBeds: '4',
      address: 'Uptown, City C',
      rent: 3000,
      description: 'A luxury penthouse with top-notch facilities and services in a prime location.',
      amenities: ['Wi-Fi', 'Private Pool', 'Concierge'],
      imageUrl: ['assets/Image 910.jpg', 'assets/AllPlant_Protein@3x.png', 'assets/Image 612.png', 'assets/Image 898.jpg'],
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

  markAsFavorite(listingId: number): Observable<void> {
    const listing = this.listings.find(l => l.id === listingId);
    if (listing) {
      console.log(`Listing ${listing.title} marked as favorite.`);
    } else {
      console.log(`Listing with ID ${listingId} not found.`);
    }
    return of();
  }

  getListingDetails(listingId: number): Observable<Listing | undefined> {
    const listing = this.listings.find(l => l.id === listingId);
    return of(listing);
  }

  getHighlightedListings(): Observable<Listing[]> {
    const highlighted = this.listings.filter(l => l.isHighlighted); // Return only highlighted listings
    return of(highlighted);
  }

  getUserComments(): Observable<Users[]> {
    return of(this.users);
  }

  getPreviewData(): Observable<propertyPreviewData[]> {
    return of(this.previewData);
  }
}
