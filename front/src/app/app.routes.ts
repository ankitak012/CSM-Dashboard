// app.routes.ts or app-routing.module.ts
import { Routes } from '@angular/router';
import { ServiceComponent } from './components/service/service.component';
import { ServerComponent } from './components/server/server.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherAnimationComponent } from './components/weather-animation/weather-animation.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { Component } from '@angular/core';



export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'service/:serverId', component: ServiceComponent },
  { path: 'servers', component: ServerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'weather', component: WeatherAnimationComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service-detail/:serverId', component: ServiceDetailComponent },
  { path: 'settings',component: SettingsComponent},
  { path: '**', redirectTo: '/dashboard' } // Catch all route
];
