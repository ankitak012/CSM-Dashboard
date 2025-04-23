import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../api/server.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Ensure Router is imported
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule,RouterModule, MatIconModule],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})

export class ServerComponent implements OnInit{
  servers: any[] = []; // Store the fetched server data
  

  constructor(
    private serverService: ServerService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.serverService.getServers().subscribe(
      (data) => {
        console.log('Server data received:', data);
        this.servers = data;
      },
      (error) => {
        console.error('Error fetching server data:', error);
      }
    );
  }


  onServerClick(serverId: number): void {
    console.log('Server clicked with ID:', serverId);
    console.log('Attempting to navigate to:', ['service', serverId]);
    this.router.navigate(['service', serverId]).then(
      success => console.log('Navigation result:', success),
      error => console.error('Navigation error:', error)
    );
  } 

  openMenuId: number | null = null;

toggleMenu(serverId: number, event: MouseEvent): void {
  event.stopPropagation(); // Prevents card click
  this.openMenuId = this.openMenuId === serverId ? null : serverId;
}

modifyServer(serverId: number, event: MouseEvent): void {
  event.stopPropagation(); // Prevent triggering onServerClick
  console.log('Modify server', serverId);
  // Add your logic here
}

deleteServer(serverId: number, event: MouseEvent): void {
  event.stopPropagation(); // Prevent triggering onServerClick
  if (confirm('Are you sure you want to delete this server?')) {
    this.serverService.deleteServer(serverId).subscribe({
      next: () => {
        console.log('Server deleted successfully');
        this.servers = this.servers.filter(server => server.id !== serverId); // Remove from UI
      },
      error: (error) => {
        console.error('Error deleting server:', error);
      }
    });
  }
}


}
  

