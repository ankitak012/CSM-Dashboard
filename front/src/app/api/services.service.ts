import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  // Using the exact URL pattern requested: http://127.0.0.1:9000/api/service/
  private apiUrl = 'http://127.0.0.1:9000/api/service/';

  constructor(private http: HttpClient) {}

  getServicesByServerId(serverId: number): Observable<any[]> {
    // Construct the URL with the server ID
    const fullUrl = `${this.apiUrl}${serverId}/`;
    console.log('Fetching services from:', fullUrl);
    return this.http.get<any[]>(fullUrl);
  }
}
