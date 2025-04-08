// app.routes.ts or app-routing.module.ts
import { Routes } from '@angular/router';
import { ServiceComponent } from './components/service/service.component';
import { ServerComponent } from './components/server/server.component';
import { AppComponent} from './app.component'
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'service/:serverId', component: ServiceComponent }, 
  { path: 'servers', component: ServerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
];
