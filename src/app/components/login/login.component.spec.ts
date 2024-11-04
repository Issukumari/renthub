import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

class MockAuthService {
  login = jasmine.createSpy('login');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when fields are filled correctly', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not submit the form when it is invalid', () => {
    spyOn(component, 'onLogin').and.callThrough();

    component.onLogin();

    expect(component.onLogin).toHaveBeenCalled();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should navigate to home on successful login', () => {
    mockAuthService.login.and.returnValue(of({})); // Mock successful login response
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    component.onLogin();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.successMessage).toBe('User logged in successfully!');

    // Simulate the navigation delay
    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    }, 1000);
  });

  it('should display error message on failed login', () => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    mockAuthService.login.and.returnValue(throwError(() => errorResponse));
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');

    component.onLogin();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');

    setTimeout(() => {
      expect(component.errorMessage).toBe('');
    }, 1000);
  });
});
