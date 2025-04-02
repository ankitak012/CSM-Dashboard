import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false; // Toggle sidebar

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
