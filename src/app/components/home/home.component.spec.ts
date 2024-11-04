import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListingService } from '../../services/listing.service';
import { of } from 'rxjs';
import { Listing } from '../../models/listing.model';

class MockListingService {
  getHighlightedListings = jasmine.createSpy('getHighlightedListings').and.returnValue(of([]));
  getPaginatedListings = jasmine.createSpy('getPaginatedListings').and.returnValue(of({ listings: [], totalPages: 1 }));
  markAsFavorite = jasmine.createSpy('markAsFavorite').and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

xdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockListingService: MockListingService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockListingService = new MockListingService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ListingService, useValue: mockListingService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load highlighted listings on init', () => {
    const highlightedListings: Listing[] = [
        { 
            id: 1, 
            title: 'Mock Listing',   
            location: 'Location A', 
            price: 100, 
            amenities: [], 
            description: 'A nice place to stay',
            isHighlighted: false,  
            isFavourite: false    
        }
    ];

    mockListingService.getHighlightedListings.and.returnValue(of(highlightedListings));

    component.ngOnInit();

    expect(mockListingService.getHighlightedListings).toHaveBeenCalled();
    expect(component.highlightedListings).toEqual(highlightedListings);
});
it('should load paginated listings on init', () => {
  const paginatedListingsResponse = { 
      listings: [
          { 
              id: 1, 
              title: 'Mock Listing',  
              location: 'Location A', 
              price: 100, 
              amenities: [], 
              description: 'A nice place to stay', 
              isHighlighted: false,  
              isFavourite: false      
          }
      ], 
      totalPages: 1 
  };

  mockListingService.getPaginatedListings.and.returnValue(of(paginatedListingsResponse));

  component.ngOnInit();

  expect(mockListingService.getPaginatedListings).toHaveBeenCalledWith(component.currentPage);
  expect(component.paginatedListings).toEqual(paginatedListingsResponse.listings);
  expect(component.originalListings).toEqual(paginatedListingsResponse.listings);
  expect(component.totalPages).toBe(paginatedListingsResponse.totalPages);
});

it('should filter listings based on search query', () => {
  component.originalListings = [
    {
      id: 1,
      title: 'Listing 1',
      location: 'New York',
      price: 100,
      amenities: ['WiFi', 'Parking'],
      imageUrl: 'image1.jpg',
      description: 'Description 1',
      isHighlighted: true,
      isFavourite: false
    },
    {
      id: 2,
      title: 'Listing 2',
      location: 'Location 2',
      price: 200,
      amenities: ['Pool', 'Gym'],
      imageUrl: 'image2.jpg',
      description: 'Description 2',
      isHighlighted: false,
      isFavourite: false
    }
  ];

  component.searchQuery = 'New';

  component.filterListings();

  expect(component.paginatedListings.length).toBe(1);
  expect(component.paginatedListings[0].location).toBe('New York');
  expect(component.paginatedListings[0].title).toBe('Listing 1'); 
});



  
  it('should toggle amenity selection', () => {
    component.selectedAmenities = ['Wi-Fi'];

    component.toggleAmenity('Parking');

    expect(component.selectedAmenities).toContain('Parking');

    component.toggleAmenity('Wi-Fi');

    expect(component.selectedAmenities).not.toContain('Wi-Fi');
  });

  it('should navigate to details page', () => {
    const listingId = 1;

    component.viewDetails(listingId);

    expect(mockRouter.navigate).toHaveBeenCalledWith([`details/${listingId}`]);
  });
});
