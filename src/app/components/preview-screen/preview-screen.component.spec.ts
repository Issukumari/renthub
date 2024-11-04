import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewScreenComponent } from './preview-screen.component';
import { ListingService } from '../../services/listing.service';
import { CommentService } from '../../services/comment.service';
import { of } from 'rxjs';

describe('PreviewScreenComponent', () => {
  let component: PreviewScreenComponent;
  let fixture: ComponentFixture<PreviewScreenComponent>;
  let mockListingService: jasmine.SpyObj<ListingService>;
  let mockCommentService: jasmine.SpyObj<CommentService>;

  beforeEach(() => {
    mockListingService = jasmine.createSpyObj('ListingService', ['getPrviewData']);
    mockCommentService = jasmine.createSpyObj('CommentService', ['getPosts']);

    TestBed.configureTestingModule({
      declarations: [PreviewScreenComponent],
      providers: [
        { provide: ListingService, useValue: mockListingService },
        { provide: CommentService, useValue: mockCommentService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewScreenComponent);
    component = fixture.componentInstance;
  });

  it('should fetch property preview data on init', () => {
    const mockPreviewData = [{ imageUrl: 'http://example.com/image.jpg' }];
    mockListingService.getPrviewData.and.returnValue(of(mockPreviewData));
    component.ngOnInit();
    fixture.detectChanges(); 
    expect(mockListingService.getPrviewData).toHaveBeenCalled();
    expect(component.propertyPreviewData).toEqual(mockPreviewData[0]);
    expect(console.log).toHaveBeenCalledWith('http://example.com/image.jpg'); // Check if console.log was called
  });

});
