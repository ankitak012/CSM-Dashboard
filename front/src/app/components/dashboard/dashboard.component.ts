import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greeting: string = '';
  currentTime: Date = new Date();

  ngOnInit() {
    this.updateGreeting();
    // Update greeting every minute
    setInterval(() => {
      this.currentTime = new Date();
      this.updateGreeting();
    }, 60000);
  }

  private updateGreeting() {
    const hour = this.currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      this.greeting = 'Good Evening';
    } else {
      this.greeting = 'Good Night';
    }
  }
} 