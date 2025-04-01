
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { ServerComponent } from './components/server/server.component';
import { ServiceComponent } from './components/service/service.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component: ServerComponent },
  { path: 'service', component: ServiceComponent },
  { path: '**', redirectTo: '' } // Redirect unknown routes
];

NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // ✅ Add this line to provide HttpClient
  ]
};