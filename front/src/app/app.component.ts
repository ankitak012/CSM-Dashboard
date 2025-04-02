import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './components/server/server.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ServerFormComponent } from './components/server-form/server-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent,FooterComponent,ServerFormComponent,SidebarComponent],
  template: `
    <app-sidebar></app-sidebar>
    <main>
    <app-header (addServerClicked)="isFormOpen = true"></app-header>

    

    <app-server-form [isVisible]="isFormOpen" (close)="isFormOpen = false"></app-server-form>

    <app-footer></app-footer>
    </main>
  `,
})
export class AppComponent {
  isFormOpen: boolean = false;

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
  }
}
