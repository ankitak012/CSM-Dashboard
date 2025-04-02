import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerFromService {
  private apiUrl = 'http://127.0.0.1:9000/api/server/'; // Ensure this matches Django URL

  constructor(private http: HttpClient) { }
  addServer(serverData: any): Observable<any> {
    return this.http.post(this.apiUrl, serverData);
  }
}
