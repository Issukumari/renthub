import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { ListingService } from '../../services/listing.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Listing } from '../../models/listing.model';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let mockListingService: jasmine.SpyObj<ListingService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockListings: Listing[] = [
    {
      id: 1,
      title: 'Listing 1',
      location: 'Location 1',
      price: 100,
      amenities: ['WiFi', 'Parking'],
      imageUrl: 'image1.jpg',
      description: 'Description 1',
      isHighlighted: true,
      isFavourite:false

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
      isFavourite:false
    }
  ];

  beforeEach(async () => {
    mockListingService = jasmine.createSpyObj('ListingService', ['markAsFavorite']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CarouselComponent],
      providers: [
        { provide: ListingService, useValue: mockListingService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.listings = mockListings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize images array from listings', () => {
    component.ngOnInit();
    expect(component.images).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('should navigate to the previous image', () => {
    component.currentIndex = 1;
    component.previousImage();
    expect(component.currentIndex).toBe(0);
  });

  it('should navigate to the next image', () => {
    component.currentIndex = 0;
    component.nextImage();
    expect(component.currentIndex).toBe(1);
  });

  it('should not navigate to the previous image if at the start', () => {
    component.currentIndex = 0;
    component.previousImage();
    expect(component.currentIndex).toBe(0);
  });

  it('should not navigate to the next image if at the end', () => {
    component.currentIndex = component.images.length - 1;
    component.nextImage();
    expect(component.currentIndex).toBe(component.images.length - 1);
  });
  it('should navigate to the details page for a listing', () => {
    const listingId = 1;
    component.viewDetails(listingId);
    expect(mockRouter.navigate).toHaveBeenCalledWith([`details/${listingId}`]);
  });
});
