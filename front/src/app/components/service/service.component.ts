import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule,  NgFor } from '@angular/common';
import { BarchartComponent } from '../../chart/barchart/barchart.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { ServicesService } from '../../api/services.service';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, NgFor,BarchartComponent,FormsModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {
  services: any[] = [];
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
  constructor(private servicesService: ServicesService, private route: ActivatedRoute, private router: Router) {}
  

  @Input() server: any; // ✅ Accept server data from ServerComponent

  goBack() {
    this.router.navigate(['/servers']);
  }

  // ngOnInit() {

  //   const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
  //   // Fetch all services from backend
  //   this.servicesService.getAllServices().subscribe((data: any[]) => {
  //     this.allServices = data;

  //     //console.log(data)
  //     // Read server_name and server_id from URL
  //     this.route.queryParams.subscribe(params => {
  //       console.log('Query Params:', params); // ✅ Debugging step
  //       const serverName = params['server_name'];
  //       const serverId = params['server_id'];

  //       console.log('Received Server:', serverName, serverId);
  //       if (!serverName || !serverId) return; // ✅ Prevent errors

  //       // ✅ Filter services based on the selected server
  //       this.filteredServices = this.allServices.filter(service => 
  //         service.server_name === serverName && service.server === serverId
  //       );
  //       // Apply time filter after loading the data
  //       this.applyTimeFilter();
  //     });
  //   });

  //   console.log('Received Server:', this.server); // ✅ Debugging check
  // }
  
  



  // processData(data: any[]) {
  //   const groupedData: { [key: string]: { key: string; server_name: string; server_id: string; data: any[] } } = {}; // Define type properly
  
  //   data.forEach(item => {
  //     const key = `${item.server_name}-${item.server_id}`;
  //     if (!groupedData[key]) {
  //       groupedData[key] = { 
  //         key,
  //         server_name: item.server_name, 
  //         server_id: item.server_id, 
  //         data: [] 
  //       };
  //     }
  //     groupedData[key].data.push(item);
  //   });
  
  //   this.serverGroups = Object.values(groupedData).map(group => ({
  //     ...group,
  //     data: group.data.sort((a: { time: string }, b: { time: string }) => 
  //       new Date(a.time).getTime() - new Date(b.time).getTime()
  //     ) // ✅ Now TypeScript understands `a` and `b` are objects with `time`
  //   }));
  
  //   // Initialize visibility and filtered data storage
  //   this.serverGroups.forEach(group => {
  //     this.visibleCharts[group.key] = false;
  //     this.filteredData[group.key] = [];
  //   });
  // }
  
  


  

  // toggleChart(group: any) {
  //   const key = group.key;
  //   this.visibleCharts[key] = !this.visibleCharts[key];
  
  //   if (this.visibleCharts[key] && group.data.length > 0) {
  //     const latestDate = group.data[group.data.length - 1].time; // Get the latest date
  //     this.filteredData[key] = group.data.filter((item: any) => item.time === latestDate);
  //   }
  // }
  
  

  // closeChart() {
  //   this.showChart = false;
  //   if (this.myChart) {
  //     this.myChart.destroy();
  //     this.myChart = null;
  //   }
  // }

  // onTimeFilterChange(event: any) {
  //   this.selectedTimeRange = event.target.value;
  //   this.applyTimeFilter();
  //   }
  
  
  // applyTimeFilter() {
  //   const now = new Date();
  //   let startTime: Date;

  //   switch (this.selectedTimeRange) {
  //     case 'minute':
  //       startTime = new Date(now.getTime() - 60 * 1000);
  //       break;
  //     case 'hour':
  //       startTime = new Date(now.getTime() - 60 * 60 * 1000);
  //       break;
  //     case 'day':
  //       startTime = new Date(now.setDate(now.getDate() - 1));
  //       break;
  //     case 'week':
  //       startTime = new Date(now.setDate(now.getDate() - 7));
  //       break;
  //     case 'month':
  //       startTime = new Date(now.setMonth(now.getMonth() - 1));
  //       break;
  //     case 'year':
  //       startTime = new Date(now.setFullYear(now.getFullYear() - 1));
  //       break;
  //     default:
  //       return;
  //   }

  //   // ✅ Read `server_name` and `server_id` from URL
  // this.route.queryParams.subscribe(params => {
  //   const serverName = params['server_name'];
  //   const serverId = params['server_id'];

  //   console.log('Filtering for:', { serverName, serverId });

  //   if (!serverName || !serverId) return;

  //   // ✅ First filter services by server_name & server_id
  //   this.filteredServices = this.allServices
  //     .filter(service => 
  //       service.server_name === serverName && 
  //       service.server === serverId
  //     )
  //     // ✅ Then apply the time filter
  //     .filter(service => {
  //       if (!service.created_on) return false; // Ignore missing dates

  //       const createdOnDate = new Date(service.created_on); // Convert to Date
  //       return createdOnDate >= startTime; // Check if it's within range
  //     });

  //   console.log('Filtered Services:', this.filteredServices);
  //   })
  // }

  ngOnInit(): void {
    const serverId = Number(this.route.snapshot.paramMap.get('serverId'));
    console.log(serverId)
    this.loadServices(serverId);
  }

  loadServices(serverId: number): void {
    console.log('Loading services for server ID:', serverId);
    this.servicesService.getServicesByServerId(serverId).subscribe({
      next: (data: any[]) => {
        console.log('Services data received:', data);
        // Calculate uptime for each service
        this.services = data.map(service => ({
          ...service,
          uptime: this.calculateDaysSince(service.created_on)
        }));
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

  calculateDaysSince(createdOn: string): number {
    const createdDate = new Date(createdOn);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - createdDate.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

}