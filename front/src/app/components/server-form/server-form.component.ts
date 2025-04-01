import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-server-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './server-form.component.html',
  styleUrl: './server-form.component.css'
})
export class ServerFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  serverName: string = '';
  serverIp: string = '';
  serverLocation: string = '';

  saveServer() {
    console.log('Server Data:', {
      name: this.serverName,
      ip: this.serverIp,
      location: this.serverLocation
    });

    this.close.emit(); // Close the form after saving
  }

  closeForm() {
    this.close.emit();
  }
}
