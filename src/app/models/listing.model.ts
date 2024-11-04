  export interface Listing {
    id: number;
    title: string;
    location: string;
    price: number;
    amenities: string[];
    imageUrl?: string;
    description: string;
    photos?: string[];
    isHighlighted: boolean;
    isFavourite: boolean;
  }
  
  export interface PaginatedResponse {
    listings: Listing[];
    totalPages: number;
  }