import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:9000/api/count/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getModelCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(this.apiUrl);
  }
}