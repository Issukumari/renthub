import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PreviewScreenComponent } from './components/preview-screen/preview-screen.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';

export const routes: Routes = [
{ path: '', component: HomeComponent,canActivate: [AuthGuard]  },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'createpost', component: CreatePostComponent },
{ path: 'previewScreen', component: PreviewScreenComponent },
{
path: 'details/:id',
component: ViewDetailsComponent 
},
{ path: 'carousel', component: CarouselComponent },
];
