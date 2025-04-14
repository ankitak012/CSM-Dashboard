import { Component, OnInit,  Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule,  NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { ServicesService, ServiceResponse } from '../../api/services.service';
import { Router } from '@angular/router';
import { createDecipheriv } from 'crypto';
import { ServerService } from '../../api/server.service';




@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, NgFor,FormsModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {
  
  services!: ServiceResponse;
  serverDetails: any = null;
  displayedIndexes: number[] = [];  // To control the delay effect
  selectedService: any = null;
  showChart: boolean = false;
  myChart: any;

  serverGroups: any[] = [];
  chartVisibility: { [key: string]: boolean } = {}; // Track visibility of each chart
  visibleCharts: { [key: string]: boolean } = {}; 
  filteredData: { [key: string]: any[] } = {}; // Store filtered data
  allServices: any[] = []; // Store all service data
  filteredServices: any[] = []; // ✅ Fix: Declare filteredServices
  selectedTimeRange: string = 'minute'; // Default selection
  
  // @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // ✅ Declare chartCanvas
  constructor(
    private servicesService: ServicesService, 
    private serverService: ServerService,
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  

  @Input() server: any; // ✅ Accept server data from ServerComponent

  goBack() {
    this.router.navigate(['/servers']);
  }

  ngOnInit(): void {
    const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    this.loadServices(serverId);
    this.loadServerDetails(serverId);
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    this.servicesService.getServicesByServerId(serverId).subscribe({
      next: (data: ServiceResponse) => {
        console.log('Services data received:', data);
        this.services = data;
        // Trigger change detection
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading services:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
      }
    });
  }

  loadServerDetails(serverId: number): void {
    this.serverService.getServers().subscribe({
      next: (servers: any[]) => {
        this.serverDetails = servers.find(server => server.id === serverId);
        console.log('Server details loaded:', this.serverDetails);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading server details:', error);
      }
    });
  }

  // Helper method to get service names for display
  getServiceNames(): string[] {
    return Object.keys(this.services);
  }

  // Helper method to get service data
  getServiceData(serviceName: string): any[] {
    return this.services[serviceName] || [];
  }

  goToServiceDetail() {
    const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    this.router.navigate(['/service-detail', serverId]);
  }
}