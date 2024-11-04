import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreatePostComponent], 
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
  
  it('should toggle amenities correctly', () => {
    component.toggleAmenity('Wi-Fi');
    expect(component.selectedAmenities).toContain('Wi-Fi');

    component.toggleAmenity('Wi-Fi'); 
    expect(component.selectedAmenities).not.toContain('Wi-Fi');
  });
});
