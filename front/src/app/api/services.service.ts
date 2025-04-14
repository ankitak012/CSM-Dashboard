import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface ServiceData {
  state: boolean;
  error: string;
  date: string;
}

export interface ServiceResponse {
  [key: string]: ServiceData[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // Using the exact URL pattern requested: http://127.0.0.1:9000/api/service/
  private apiUrl = 'http://127.0.0.1:9000/api/service/';

  constructor(private http: HttpClient) {}

  getServicesByServerId(serverId: number): Observable<ServiceResponse> {
    // Construct the URL with the server ID
    const fullUrl = `${this.apiUrl}${serverId}/`;
    console.log('Fetching services from:', fullUrl);
    
    return this.http.get<ServiceResponse>(fullUrl).pipe(
      tap(response => {
        console.log('Raw service data:', response);
        // Log the structure of each service
        Object.keys(response).forEach(serviceName => {
          console.log(`Service ${serviceName} data:`, response[serviceName]);
        });
      }),
      map(response => {
        // Transform dates to a more readable format if needed
        const transformedResponse: ServiceResponse = {};
        Object.keys(response).forEach(serviceName => {
          transformedResponse[serviceName] = response[serviceName].map(entry => ({
            ...entry,
            date: new Date(entry.date).toLocaleString()
          }));
        });
        return transformedResponse;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching services';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
