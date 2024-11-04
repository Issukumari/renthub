import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

class MockAuthService {
  isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(false);
  logout = jasmine.createSpy('logout').and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: MockAuthService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockAuthService = new MockAuthService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports:  [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to home if authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to login if not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    component.goHome();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('should navigate to login on logout', () => {
    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });


  it('should navigate to login on openLogin', () => {
    component.openLogin();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to register on openRegister', () => {
    component.openRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });
});
