import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherAnimationComponent } from '../weather-animation/weather-animation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WeatherAnimationComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  greeting: string = '';
  currentTime: Date = new Date();
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';
  private intervalId: any;

  constructor() {
    this.updateGreeting();
  }

  ngOnInit() {
    // Update greeting and timeOfDay every minute
    this.intervalId = setInterval(() => this.updateGreeting(), 60000);
  }

  ngOnDestroy() {
    // Clean up interval when component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    this.currentTime = new Date();
  }

  private updateGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
      this.timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon';
      this.timeOfDay = 'afternoon';
    } else if (hour >= 17 && hour < 21) {
      this.greeting = 'Good Evening';
      this.timeOfDay = 'evening';
    } else {
      this.greeting = 'Good Night';
      this.timeOfDay = 'night';
    }
  }
} 