import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WeatherData {
  temperature?: number;
  humidity?: number;
  description?: string;
  location?: string;
  [key: string]: any; // For additional weather properties
}

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-animation.component.html',
  styleUrls: ['./weather-animation.component.css']
})
export class WeatherAnimationComponent implements OnInit {
  @Input() timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';
  @Input() weatherData: WeatherData = {};

  constructor() {}

  ngOnInit() {}

  // Helper method to check if weather data exists
  hasWeatherData(): boolean {
    return Object.keys(this.weatherData).length > 0;
  }
} 