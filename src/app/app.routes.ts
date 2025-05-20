import { provideRouter, Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AccountpageComponent } from './pages/accountpage/accountpage.component';
import { redirectGuard } from './services/redirect.guard';
import { InventorypageComponent } from './pages/inventorypage/inventorypage.component';

export const routes: Routes = [
  { path: 'loginn', component: LoginPageComponent, canActivate: [redirectGuard] }, // Apply redirect guard to login page
  { path: 'register', component: RegisterPageComponent, canActivate: [redirectGuard] }, // Apply redirect guard to register page

  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard], // Apply guard to all child routes
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'accountpage', component: AccountpageComponent },
      { path: 'inventory', component: InventorypageComponent },
      
    ]
  }
];
