import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false; // Toggle sidebar

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  goBack() {
    this.router.navigate(['/servers']);
  }
  gotodashborad() {
    this.router.navigate(['/dashboard']);
  }

  gotosetting() {
    this.router.navigate(['/settings'])
  }
}
