import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './components/server/server.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
     <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
