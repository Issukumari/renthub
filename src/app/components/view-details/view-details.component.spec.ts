import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ViewDetailsComponent } from './view-details.component';
import { ListingService } from '../../services/listing.service';

describe('ViewDetailsComponent', () => {
  let component: ViewDetailsComponent;
  let fixture: ComponentFixture<ViewDetailsComponent>;
  let mockListingService: jasmine.SpyObj<ListingService>;

  beforeEach(() => {
    mockListingService = jasmine.createSpyObj('ListingService', ['getUserComments']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ViewDetailsComponent],
      providers: [
        { provide: ListingService, useValue: mockListingService },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDetailsComponent);
    component = fixture.componentInstance;

    console.log('Component created:', component);

    fixture.detectChanges();
  });

  it('should create the form and fetch comments on init', () => {
    const mockComments = [
      { name: 'user1', description: 'Great place!' },
      { name: 'user2', description: 'Loved it!' },
    ];
    
    mockListingService.getUserComments.and.returnValue(of(mockComments));

    component.ngOnInit(); 

    expect(mockListingService.getUserComments).toHaveBeenCalled();
    expect(component.comments).toEqual(mockComments); 
  });

  it('should add a comment when the form is valid', () => {
    component.createPostForm.setValue({ description: 'This is a valid comment.' });

    component.onSubmit();

    expect(component.comments.length).toBe(1); 
    expect(component.comments[0]).toEqual({
      name: 'user3',
      description: 'This is a valid comment.',
    });
  });

  it('should not add a comment when the form is invalid', () => {
    component.createPostForm.setValue({ description: '' });
    component.onSubmit();

    expect(component.comments.length).toBe(0);
    expect(component.createPostForm.touched).toBeTruthy(); 
  });
});
