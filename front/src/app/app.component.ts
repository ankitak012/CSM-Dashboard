import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './components/server/server.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ServerFormComponent } from './components/server-form/server-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent,ServerFormComponent],
  template: `
    <app-header (addServerClicked)="isFormOpen = true"></app-header>

    <div class="main-content">
      <router-outlet></router-outlet>
    </div>

    <app-server-form [isVisible]="isFormOpen" (close)="isFormOpen = false"></app-server-form>

    <app-footer></app-footer>
  `,
})
export class AppComponent {
  isFormOpen: boolean = false;
}
