import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCk1qrViAmIcNBpP5ntUwaDuLl6rlgyQAg",
  authDomain: "article-fd065.firebaseapp.com",
  projectId: "article-fd065",
  storageBucket: "article-fd065.appspot.com",
  messagingSenderId: "322476443445",
  appId: "1:322476443445:web:9cc4e11bb75bea6aebae7c",
  measurementId: "G-0ZLN38RNFJ"
};
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideFirestore(() => getFirestore()),                  
    provideAuth(() => getAuth())                          
  ]
})
.catch(err => console.error(err));