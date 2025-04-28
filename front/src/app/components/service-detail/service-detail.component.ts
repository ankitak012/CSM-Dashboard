import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ServicesService, ServiceResponse } from '../../api/services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceEntry {
  state: boolean;
  error: string;
  date: string;
}

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, NgFor, CommonModule, FormsModule, RouterModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {
  services!: any;
  serverId!: number;
  selectedField: string = '';
  filteredServices: { [key: string]: ServiceEntry[] } = {};

  constructor(
    private servicesService: ServicesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() server: any;

  ngOnInit(): void {
    // Get serverId from the current URL
    this.serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    
    // Get the field from query parameters
    this.route.queryParams.subscribe(params => {
      this.selectedField = params['field'] || '';
      console.log('Selected field:', this.selectedField);
    });
    
    this.loadServices(this.serverId);
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    this.servicesService.getServices(serverId).subscribe({
      next: (data: ServiceResponse) => {
        console.log('Services data received:', data);
        this.services = data;
        this.filterServicesByField();
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

  filterServicesByField(): void {
    if (!this.services) return;
    
    this.filteredServices = {};
    
    if (this.selectedField) {
      // If a specific field is selected, only show that field
      if (this.services[this.selectedField]) {
        this.filteredServices[this.selectedField] = this.services[this.selectedField];
      }
    } else {
      // If no field is selected, show all services
      this.filteredServices = this.services;
    }
    
    console.log('Filtered services:', this.filteredServices);
  }

  getServiceNames(): string[] {
    return Object.keys(this.filteredServices || {});
  }

  getServiceData(serviceName: string): ServiceEntry[] {
    return this.filteredServices?.[serviceName] || [];
  }

  goBack() {
    // Navigate back to the service list with the server ID
    this.router.navigate(['/service', this.serverId]);
  }
}



