import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../api/server.service';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from '../service/service.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit{
  servers: any[] = []; // Store the fetched server data
  selectedServer: any = null; // Store the clicked server

  constructor(private serverService: ServerService, private router: Router) {}

  ngOnInit(): void {
    this.getServers();
  }

  getServers(): void {
    this.serverService.getAllServer().subscribe(
      (data) => {
        this.servers = data;
      },
      (error) => {
        console.error('Error fetching server data:', error);
      }
    );
  }

  openService(server: { server_name: string; server_id: string }) {
    const url = `/service?server_name=${encodeURIComponent(server.server_name)}&server_id=${server.server_id}`;
    window.open(url, '_blank');
    
  }

  
}
