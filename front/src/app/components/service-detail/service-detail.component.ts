import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ServicesService, ServiceResponse } from '../../api/services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, NgFor, CommonModule, FormsModule, RouterModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {
  services!: any;
  serverId!: number;

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
    this.loadServices(this.serverId);
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    this.servicesService.getServicesByServerId(serverId).subscribe({
      next: (data: ServiceResponse) => {
        console.log('Services data received:', data);
        this.services = data;
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

  getServiceNames(): string[] {
    return Object.keys(this.services || {});
  }

  getServiceData(serviceName: string): any[] {
    return this.services?.[serviceName] || [];
  }

  goBack() {
    // Navigate back to the service list with the server ID
    this.router.navigate(['/service', this.serverId]);
  }
}



