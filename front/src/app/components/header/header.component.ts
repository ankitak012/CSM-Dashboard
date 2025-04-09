import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() addServerClicked = new EventEmitter<void>();
  constructor(private router: Router) {}
  openServerForm() {
    this.addServerClicked.emit(); // Emit event to parent component
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
