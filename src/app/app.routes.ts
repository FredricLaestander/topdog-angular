import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'sign-up', component: SignUpComponent },
];
