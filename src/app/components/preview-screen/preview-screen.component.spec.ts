import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListingService } from '../../services/listing.service';
import { PreviewScreenComponent } from './preview-screen.component';

describe('PreviewScreenComponent', () => {
    let component: PreviewScreenComponent;
    let fixture: ComponentFixture<PreviewScreenComponent>;
    let mockListingService: jasmine.SpyObj<ListingService>;

    beforeEach(async () => {
        mockListingService = jasmine.createSpyObj('ListingService', ['getPrviewData']);

        await TestBed.configureTestingModule({
            imports: [PreviewScreenComponent],
            providers: [
                { provide: ListingService, useValue: mockListingService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PreviewScreenComponent);
        component = fixture.componentInstance;
    });

    it('should fetch property preview data on init', () => {
        const mockPreviewData = [
            {
                propertyType: 'Apartment',
                numberOfBeds: '2',
                address: '123 Main St',
                rent: 1200,
                imageUrl: ['http://example.com/image.jpg'],
                description: '',
                amenities: ['wifi']
            }
        ];
        
        mockListingService.getPrviewData.and.returnValue(of(mockPreviewData));

        component.ngOnInit();
        fixture.detectChanges(); 

        expect(mockListingService.getPrviewData).toHaveBeenCalled();
        expect(component.propertyPreviewData).toEqual(mockPreviewData[0]);
    });
});
