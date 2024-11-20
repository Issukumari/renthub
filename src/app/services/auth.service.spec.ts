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
  
});
