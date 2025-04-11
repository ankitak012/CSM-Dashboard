import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ServicesService } from '../../api/services.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-service-detail',
  imports: [CommonModule,NgFor, CommonModule,FormsModule, RouterModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {

  services!:any;

  constructor(
    private servicesService: ServicesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() server: any; // ✅ Accept server data from ServerComponent

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

  goBack() {
    const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    this.router.navigate(['/service/'+serverId]);
  }
}



