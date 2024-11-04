import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post.component';
import { OnlyLettersValidator } from '../lettersvalidator';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreatePostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with correct controls', () => {
    expect(component.createPostForm).toBeTruthy();
    expect(component.createPostForm.contains('selectedOption')).toBe(true);
    expect(component.createPostForm.contains('name')).toBe(true);
    expect(component.createPostForm.contains('propertyLocation')).toBe(true);
    expect(component.createPostForm.contains('sharedProperty')).toBe(true);
    expect(component.createPostForm.contains('propertyDetails')).toBe(true);
    expect(component.createPostForm.contains('stayOrLeaseType')).toBe(true);
    expect(component.createPostForm.contains('priceType')).toBe(true);
    expect(component.createPostForm.contains('furnishedFlat')).toBe(true);
    expect(component.createPostForm.contains('expectedRent')).toBe(true);
    expect(component.createPostForm.contains('title')).toBe(true);
    expect(component.createPostForm.contains('description')).toBe(true);
  });

  it('should validate the name field with only letters', () => {
    const nameControl = component.createPostForm.get('name')!;
    nameControl.setValue('John123');
    expect(nameControl.valid).toBe(false);
  
    nameControl.setValue('John');
    expect(nameControl.valid).toBe(true);
  });
  

  it('should submit the form with valid data', () => {
    const formValue = {
      selectedOption: 'Option 1',
      name: 'John',
      propertyLocation: 'New York',
      sharedProperty: 'Yes',
      propertyDetails: 'Details about the property',
      stayOrLeaseType: 'ShortTerm',
      priceType: 'Per Month',
      furnishedFlat: 'Yes',
      expectedRent: '1500',
      title: 'My Apartment',
      description: 'Nice place',
    };

    component.createPostForm.patchValue(formValue);
    component.toggleAmenity('Wi-Fi'); // Toggling an amenity
    component.onSubmit();

    // Check that the form resets after submission
    expect(component.createPostForm.value).toEqual({
      selectedOption: '',
      name: '',
      propertyLocation: '',
      sharedProperty: '',
      propertyDetails: '',
      stayOrLeaseType: '',
      priceType: '',
      furnishedFlat: '',
      expectedRent: '',
      title: '',
      description: '',
    });
    expect(component.selectedAmenities).toEqual([]);
  });

  it('should not submit the form if invalid', () => {
    const formValue = {
      selectedOption: '',
      name: 'John',
      propertyLocation: 'New York',
      sharedProperty: 'Yes',
      propertyDetails: 'Details about the property',
      stayOrLeaseType: 'ShortTerm',
      priceType: 'Per Month',
      furnishedFlat: 'Yes',
      expectedRent: '1500',
      title: '',
      description: 'Nice place',
    };

    component.createPostForm.patchValue(formValue);
    jest.spyOn(component.createPostForm, 'markAllAsTouched'); // Spy on markAllAsTouched

    component.onSubmit();

    // Check that markAllAsTouched was called
    expect(component.createPostForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should toggle amenities correctly', () => {
    component.toggleAmenity('Wi-Fi');
    expect(component.selectedAmenities).toContain('Wi-Fi');

    component.toggleAmenity('Wi-Fi'); // Toggling it off
    expect(component.selectedAmenities).not.toContain('Wi-Fi');
  });
});

