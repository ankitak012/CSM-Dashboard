import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-animation.component.html',
  styleUrls: ['./weather-animation.component.css']
})
export class WeatherAnimationComponent implements OnInit {
  @Input() timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';

  constructor() {}

  ngOnInit() {}
} 