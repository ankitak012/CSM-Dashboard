import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../../api/count.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  modelCount: number = 0;

  @Output() countUpdated = new EventEmitter<number>(); // Output event emitter
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchModelCount();
  }

  fetchModelCount(): void {
    this.apiService.getModelCount().subscribe(
      data => {
        this.modelCount = data.count;
        this.countUpdated.emit(this.modelCount); // Emit the value
      },
      error => console.error('Error fetching count:', error)
    );
  }
}
