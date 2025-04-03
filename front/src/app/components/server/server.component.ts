import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../api/server.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Ensure Router is imported



@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})

export class ServerComponent implements OnInit{
  servers: any[] = []; // Store the fetched server data
  
  constructor(private serverService: ServerService) {}



  ngOnInit(): void {
    this.serverService.getServers().subscribe(
      (data) => {
        this.servers = data.map(server => ({
          ...server,
          uptime: this.calculateDaysSince(server.created_on)
        }));
      },
      (error) => {
        console.error('Error fetching server data:', error);
      }
    );
  }

  calculateDaysSince(createdOn: string): number {
    const createdDate = new Date(createdOn);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - createdDate.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
}
  

