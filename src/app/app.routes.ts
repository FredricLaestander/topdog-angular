import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CreateListComponent } from './pages/create-list/create-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list/:id', component: ListComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'create-list', component: CreateListComponent },
];
