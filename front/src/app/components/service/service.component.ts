import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule,  NgFor } from '@angular/common';
import { BarchartComponent } from '../../chart/barchart/barchart.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule


Chart.register(...registerables);

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, NgFor,BarchartComponent,FormsModule],
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
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  @Input() server: any; // ✅ Accept server data from ServerComponent

  

  ngOnInit() {
    // Fetch all services from backend
    this.apiService.getAllServices().subscribe((data: any[]) => {
      this.allServices = data;

      //console.log(data)
      // Read server_name and server_id from URL
      this.route.queryParams.subscribe(params => {
        console.log('Query Params:', params); // ✅ Debugging step
        const serverName = params['server_name'];
        const serverId = params['server_id'];

        console.log('Received Server:', serverName, serverId);
        if (!serverName || !serverId) return; // ✅ Prevent errors

        // ✅ Filter services based on the selected server
        this.filteredServices = this.allServices.filter(service => 
          service.server_name === serverName && service.server === serverId
        );
        // Apply time filter after loading the data
        this.applyTimeFilter();
      });
    });
    console.log('Received Server:', this.server); // ✅ Debugging check
  }
  
  

  //showCardsOneByOne() {
  //  this.services.forEach((_, index) => {
   //   setTimeout(() => {
   //     this.displayedIndexes.push(index);
    //  }, index * 500); // 500ms delay per card
   // });
  //}

  processData(data: any[]) {
    const groupedData: { [key: string]: { key: string; server_name: string; server_id: string; data: any[] } } = {}; // Define type properly
  
    data.forEach(item => {
      const key = `${item.server_name}-${item.server_id}`;
      if (!groupedData[key]) {
        groupedData[key] = { 
          key,
          server_name: item.server_name, 
          server_id: item.server_id, 
          data: [] 
        };
      }
      groupedData[key].data.push(item);
    });
  
    this.serverGroups = Object.values(groupedData).map(group => ({
      ...group,
      data: group.data.sort((a: { time: string }, b: { time: string }) => 
        new Date(a.time).getTime() - new Date(b.time).getTime()
      ) // ✅ Now TypeScript understands `a` and `b` are objects with `time`
    }));
  
    // Initialize visibility and filtered data storage
    this.serverGroups.forEach(group => {
      this.visibleCharts[group.key] = false;
      this.filteredData[group.key] = [];
    });
  }
  
  


  // openChart(service: any) {
  //   this.selectedService = service;
  //   console.log("Selected Service Data:", this.selectedService.server_name); // Debugging
  //   this.showChart = true;

  //   setTimeout(() => this.loadChart(), 200); // Ensure modal loads
  // }

  toggleChart(group: any) {
    const key = group.key;
    this.visibleCharts[key] = !this.visibleCharts[key];
  
    if (this.visibleCharts[key] && group.data.length > 0) {
      const latestDate = group.data[group.data.length - 1].time; // Get the latest date
      this.filteredData[key] = group.data.filter((item: any) => item.time === latestDate);
    }
  }
  
  

  closeChart() {
    this.showChart = false;
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = null;
    }
  }

  onTimeFilterChange(event: any) {
    this.selectedTimeRange = event.target.value;
    this.applyTimeFilter();
    }
  
  
  applyTimeFilter() {
    const now = new Date();
    let startTime: Date;

    switch (this.selectedTimeRange) {
      case 'minute':
        startTime = new Date(now.getTime() - 60 * 1000);
        break;
      case 'hour':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case 'day':
        startTime = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startTime = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startTime = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startTime = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return;
    }

    // ✅ Read `server_name` and `server_id` from URL
  this.route.queryParams.subscribe(params => {
    const serverName = params['server_name'];
    const serverId = params['server_id'];

    console.log('Filtering for:', { serverName, serverId });

    if (!serverName || !serverId) return;

    // ✅ First filter services by server_name & server_id
    this.filteredServices = this.allServices
      .filter(service => 
        service.server_name === serverName && 
        service.server === serverId
      )
      // ✅ Then apply the time filter
      .filter(service => {
        if (!service.created_on) return false; // Ignore missing dates

        const createdOnDate = new Date(service.created_on); // Convert to Date
        return createdOnDate >= startTime; // Check if it's within range
      });

    console.log('Filtered Services:', this.filteredServices);
    })
  }

  // loadChart() {
  //   if (!this.chartCanvas || !this.chartCanvas.nativeElement) return;
  //   const ctx = this.chartCanvas.nativeElement as HTMLCanvasElement;
  
  //   if (this.myChart) {
  //     this.myChart.destroy();
  //   }
  
  //   if (!this.selectedService) return;
  
  //   // Extract boolean values
  //   const serviceData = { ...this.selectedService };
  //   const excludeFields = ['id', 'created_on', 'server', 'error', 'upCount', 'downCount'];
  //   const labels: string[] = [];
  //   const data: number[] = [];
  //   const backgroundColors: string[] = [];
  
  //   for (const key in serviceData) {
  //     if (!excludeFields.includes(key) && typeof serviceData[key] === 'boolean') {
  //       labels.push(key);
  //       data.push(serviceData[key] ? 1 : 0);
  //       backgroundColors.push(serviceData[key] ? 'green' : 'red');
  //     }
  //   }
  
  //   this.myChart = new Chart(ctx, {
  //     type: 'bar',  
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: `Service Status - ${this.selectedService?.server?.server_name || 'No Server'}`,
  //         data: data,
  //         backgroundColor: backgroundColors,
  //         borderColor: 'black',
  //         borderWidth: 1,
  //         barThickness: 30 // Adjust bar thickness
  //       }]
  //     },
  //     options: {
  //       indexAxis: 'y',  // This makes it horizontal
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: { display: false } // Hide legend
  //       },
  //       scales: {
  //         x: {
  //           beginAtZero: true,
  //           ticks: { stepSize: 1 }
  //         },
  //         y: {
  //           ticks: { font: { size: 14 } } // Bigger labels
  //         }
  //       }
  //     }
  //   });
  // }
  

}



