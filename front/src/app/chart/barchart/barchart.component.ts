import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule


@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})

export class BarchartComponent {
  @Input() chartData: any[] = [];  // ✅ Accepts data from the parent component
  numDivs: number = 0; // Default to 10 divs
  containers = Array.from({ length: 9 }, (_, i) => i); // Create an array [0,1,2,...,8]


  constructor() {
    console.log(this.chartData);
  }

  // Method to update the value from child
  onCountUpdated(count: number) {
    this.numDivs = count;
  }

  
  getArray(size: number): number[] {
    return Array(size).fill(0);
  }

  getBarColor(value: boolean): string {
    return value ? 'green' : 'red';
  }
}
