import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://127.0.0.1:9000/api/server/'; // Replace with your actual API URL
  constructor(private http: HttpClient) {}

  getAllServer(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl);
  }




}