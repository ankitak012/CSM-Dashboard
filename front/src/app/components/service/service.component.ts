import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule,  NgFor } from '@angular/common';
import { BarchartComponent } from '../../chart/barchart/barchart.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { ServicesService } from '../../api/services.service';
import { Router } from '@angular/router';
import { createDecipheriv } from 'crypto';

Chart.register(...registerables);

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, NgFor,FormsModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {
  
  services!:any;
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
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    this.servicesService.getServicesByServerId(serverId).subscribe({
      next: (data: any[]) => {
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

  // Helper method to get service names for display
  getServiceNames(): string[] {
    return Object.keys(this.services);
  }

  // Helper method to get service data
  getServiceData(serviceName: string): any[] {
    return this.services[serviceName] || [];
  }
}