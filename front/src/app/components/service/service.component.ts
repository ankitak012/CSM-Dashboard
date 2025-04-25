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
  
  //services!: ServiceResponse;
  services: { [key: string]: any[] } = {};
  serverDetails: any = null;
  displayedIndexes: number[] = [];  // To control the delay effect
  selectedService: any = null;
  filterServices: any = [];

  startDate: string = '';
  endDate: string = '';

  serverGroups: any[] = [];
  filteredData: { [key: string]: any[] } = {}; // Store filtered data
  
  selectedTimeFilter: string = 'month'; // default
  //allServiceData: any[] = []; // raw from backend
  allServiceData: { [key: string]: any[] } = {};

  filteredServiceData: { [key: string]: any[] } = {};
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
    this.applyTimeFilter();
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    
    this.servicesService.getServicesByServerId(serverId).subscribe({
      next: (data: any) => {
        console.log('Services data received:', data);

        this.allServiceData = data;
        // Apply filter after loading
        this.applyTimeFilter();
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

  // applyTimeFilter(): void {
  //   const now = new Date();
  //   this.filteredServiceData = {};

  //   const start = this.startDate ? new Date(this.startDate) : null;
  //   const end = this.endDate ? new Date(this.endDate) : null;
  //   if (end) end.setHours(23, 59, 59, 999); // Include the full end date

  //   for (const key in this.allServiceData) {
  //     console.log("this.allServiceData : ",this.allServiceData)

  //     this.filteredServiceData[key] = this.allServiceData[key].filter((service:any) => {
  //       const entryTime = new Date(service.date);
  //       const diff = now.getTime() - entryTime.getTime();
        
  //        // 1️⃣ Check if date range is selected
  //       if (start && end) {
  //         return entryTime >= start && entryTime <= end;
  //       }

  //       switch (this.selectedTimeFilter.toLowerCase()) {
  //         case 'minute': return diff < 1000 * 60;
  //         case 'hour': return diff < 1000 * 60 * 60;
  //         case 'day': return diff < 1000 * 60 * 60 * 24;
  //         case 'month': return diff < 1000 * 60 * 60 * 24 * 30;
  //         case 'year': return diff < 1000 * 60 * 60 * 24 * 365;
  //         default: return true;
  //       }
        
  //     });
  //   }

  //   // Optional: update displayed services directly if your template uses `services`
  //   this.services = this.filteredServiceData;
  //   console.log("Filtered services (1 month):", this.services);


  // }

  applyTimeFilter(): void {
    const now = new Date();
    this.filteredServiceData = {};
  
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;
    if (end) end.setHours(23, 59, 59, 999); // Include the full end date
  
    // Define time range for selectedTimeFilter if start/end are not selected
    let timeThreshold: Date | null = null;
    if (!start && !end) {
      switch (this.selectedTimeFilter.toLowerCase()) {
        case 'minute':
          timeThreshold = new Date(now.getTime() - 1000 * 60);
          break;
        case 'hour':
          timeThreshold = new Date(now.getTime() - 1000 * 60 * 60);
          break;
        case 'day':
          timeThreshold = new Date(now.getTime() - 1000 * 60 * 60 * 24);
          break;
        case 'month':
          timeThreshold = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30);
          break;
        case 'year':
          timeThreshold = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 365);
          break;
        default:
          timeThreshold = null;
      }
    }
  
    for (const key in this.allServiceData) {
      this.filteredServiceData[key] = this.allServiceData[key].filter((service: any) => {
        const entryTime = new Date(service.date);
  
        // ✅ 1. If both start and end selected, filter by range
        if (start && end) {
          return entryTime >= start && entryTime <= end;
        }
  
        // ✅ 2. If timeThreshold is set (Minute, Hour, etc.), compare
        if (timeThreshold) {
          return entryTime >= timeThreshold && entryTime <= now;
        }
  
        // ✅ 3. Default: Show everything
        return true;
      });
    }
  
    this.services = this.filteredServiceData;
    console.log("Filtered services:", this.services);
  }
  
  // applyTimeFilter(): void {
  //   this.servicesService.getFilteredServices(this.startDate, this.endDate, this.selectedTimeFilter)
  //     .subscribe((data) => {
  //       this.filterServices = data;
  //       console.log("data: ",data)
  //       console.log("Filtered services from backend:", this.services);
  //     });
  // }
  
  

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
  getServiceData(key: string): any[] {
    return this.services[key] || [];
  }

  goToServiceDetail(field: string) {
    const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    this.router.navigate(['/service-detail', serverId], { queryParams: { field: field } });
  }

  onTimeFilterChange(): void {
    this.applyTimeFilter();
    this.startDate = '';
    this.endDate = '';
  }

  
  

  
}