import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private apiUrl = 'http://127.0.0.1:9000/api/service/'; // Django API URL

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<any[]> {
    
    return this.http.get<any[]>(this.apiUrl);
  }
}
