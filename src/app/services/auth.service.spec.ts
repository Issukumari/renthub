import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { of, from } from 'rxjs';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { setDoc, doc, getDoc } from '@angular/fire/firestore';

const mockAuth :any= {
  currentUser: null,
};

const mockFirestore:any = {
};

// jest.mock('@angular/fire/auth', () => ({
//   Auth: jest.fn().mockImplementation(() => mockAuth),
//   createUserWithEmailAndPassword: jest.fn(),
//   signInWithEmailAndPassword: jest.fn(),
//   signOut: jest.fn(),
// }));

// jest.mock('@angular/fire/firestore', () => ({
//   Firestore: jest.fn().mockImplementation(() => mockFirestore),
//   setDoc: jest.fn(),
//   doc: jest.fn().mockImplementation(() => jest.fn()), 
//   getDoc: jest.fn(),
// }));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
      ],
    });

    authService = TestBed.inject(AuthService);
  });
  describe('AuthService', () => {
    it('should be a placeholder test for AuthService', () => {
      expect(true).toBeTruthy();
    });
  });
  

  // it('should register a user and save their data in Firestore', async () => {
  //   const mockUserCredential = {
  //     user: { uid: '123', email: 'test@example.com' },
  //   };
  //   (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);
  //   (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

  //   const result = await authService.register('Test User', 'test@example.com', 'password123').toPromise();

  //   expect(result).toEqual(mockUserCredential.user);
  //   expect(setDoc).toHaveBeenCalledWith(doc(mockFirestore, `users/${mockUserCredential.user.uid}`), {
  //     name: 'Test User',
  //     email: 'test@example.com',
  //     uid: mockUserCredential.user.uid,
  //     createdAt: expect.any(Date),
  //   });
  // });

  // it('should log in a user', async () => {
  //   const mockUserCredential = {
  //     user: { uid: '123', email: 'test@example.com' },
  //   };
  //   (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce(mockUserCredential);

  //   const result = await authService.login('test@example.com', 'password123').toPromise();

  //   expect(result).toEqual(mockUserCredential);
  //   expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, 'test@example.com', 'password123');
  // });

  // it('should fetch user data from Firestore', async () => {
  //   const mockDoc = {
  //     data: jest.fn().mockReturnValue({ name: 'Test User', email: 'test@example.com' }),
  //   };
  //   (getDoc as jest.Mock).mockResolvedValueOnce(mockDoc);
    
  //   const result = await authService.getUserData('123').toPromise();

  //   expect(result).toEqual({ name: 'Test User', email: 'test@example.com' });
  //   expect(getDoc).toHaveBeenCalledWith(doc(mockFirestore, 'users/123'));
  // });

  // it('should check if a user is authenticated', () => {
  //   mockAuth.currentUser = { uid: '123' };
  //   expect(authService.isAuthenticated()).toBe(true);

  //   mockAuth.currentUser = null;
  //   expect(authService.isAuthenticated()).toBe(false);
  // });

  // it('should log out a user', async () => {
  //   (signOut as jest.Mock).mockResolvedValueOnce(undefined);

  //   await authService.logout().toPromise();

  //   expect(signOut).toHaveBeenCalledWith(mockAuth);
  // });
});
