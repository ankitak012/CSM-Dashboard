import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() addServerClicked = new EventEmitter<void>();

  openServerForm() {
    this.addServerClicked.emit(); // Emit event to parent component
  }
}
