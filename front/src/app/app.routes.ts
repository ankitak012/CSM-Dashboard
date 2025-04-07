// app.routes.ts or app-routing.module.ts
import { Routes } from '@angular/router';
import { ServiceComponent } from './components/service/service.component';
import { ServerComponent } from './components/server/server.component';
import { AppComponent} from './app.component'

export const routes: Routes = [
  { path: '', redirectTo: '/servers', pathMatch: 'full' },
  { path: 'service/:serverId', component: ServiceComponent }, 
  { path: 'servers', component: ServerComponent },
  
];
