// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';

// export interface ServiceData {
//   state: boolean;
//   error: string;
//   date: string;
// }

// export interface ServiceResponse {
//   [key: string]: ServiceData[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ServicesService {
//   // Using the exact URL pattern requested: http://127.0.0.1:9000/api/service/
//   private apiUrl = 'http://127.0.0.1:9000/api/service/';
//   private baseUrl = 'http://127.0.0.1:9000/api'; // change this to your backend URL
  
//   constructor(private http: HttpClient) {}

//   getServicesByServerId(serverId: number): Observable<ServiceResponse> {
//     // Construct the URL with the server ID
//     const fullUrl = `${this.apiUrl}${serverId}/`;
//     console.log('Fetching services from:', fullUrl);
    
//     return this.http.get<ServiceResponse>(fullUrl).pipe(
//       tap(response => {
//         console.log('Raw service data:', response);
//         // Log the structure of each service
//         Object.keys(response).forEach(serviceName => {
//           console.log(`Service ${serviceName} data:`, response[serviceName]);
//         });
//       }),
//       map(response => {
//         // Transform dates to a more readable format if needed
//         const transformedResponse: ServiceResponse = {};
//         Object.keys(response).forEach(serviceName => {
//           transformedResponse[serviceName] = response[serviceName].map(entry => ({
//             ...entry,
//             date: new Date(entry.date).toLocaleString()
//           }));
//         });
//         return transformedResponse;
//       }),
//       catchError(this.handleError)
//     );
//   }

//   // private handleError(error: HttpErrorResponse) {
//   //   let errorMessage = 'An error occurred while fetching services';
    
//   //   if (error.error instanceof ErrorEvent) {
//   //     // Client-side error
//   //     errorMessage = `Error: ${error.error.message}`;
//   //   } else {
//   //     // Server-side error
//   //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   //   }
    
//   //   console.error('Service Error:', errorMessage);
//   //   return throwError(() => new Error(errorMessage));
//   // }

//   /**
//    * Fetch services with optional time filter or date range
//    * @param serverId - server id
//    * @param filterType - 'minute', 'hour', 'day', 'week', 'month', 'year' (default 'month')
//    * @param startDate - optional start date (yyyy-MM-dd)
//    * @param endDate - optional end date (yyyy-MM-dd)
//    */
//   getFilteredServices(
//     serverId: number,
//     filterType: string = 'month',
//     startDate?: string,
//     endDate?: string
//   ): Observable<any> {
//     let params = new HttpParams();

//     // If startDate and endDate are provided, use them
//     if (startDate && endDate) {
//       params = params.set('start_date', startDate).set('end_date', endDate);
//     } else {
//       // Otherwise, use filterType (minute, hour, day, etc.)
//       params = params.set('filter_type', filterType);
//     }

//     const url = `${this.baseUrl}/services/${serverId}/`;  // your Django endpoint must match this
//     return this.http.get(url, { params });
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Interfaces for better typing
export interface ServiceData {
  state: boolean;
  error: string;
  date: string;
}

export interface ServiceResponse {
  [serviceName: string]: ServiceData[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = 'http://127.0.0.1:9000/api/service/'; // Backend API Base URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch services by server ID with optional filters
   * @param serverId - server ID
   * @param filterType - optional filter type: 'minute', 'hour', 'day', 'month', 'year'
   * @param startDate - optional start date (yyyy-MM-dd)
   * @param endDate - optional end date (yyyy-MM-dd)
   */
  getServices(
    serverId: number,
    filterType: string = 'month',
    startDate?: string,
    endDate?: string
  ): Observable<ServiceResponse> {
    const fullUrl = `${this.baseUrl}${serverId}/`;
    let params = new HttpParams();

    // Prioritize custom date range if provided
    if (startDate && endDate) {
      params = params.set('start_date', startDate).set('end_date', endDate);
    } else {
      params = params.set('filter_type', filterType);
    }

    console.log(`Fetching services for server ${serverId} with params: ${params.toString()}`);

    return this.http.get<ServiceResponse>(fullUrl, { params }).pipe(
      tap(response => {
        console.log('Service API response:', response);
      }),
      map(response => {
        // Optional: Convert date into readable format
        const transformedResponse: ServiceResponse = {};
        for (const serviceName in response) {
          if (response.hasOwnProperty(serviceName)) {
            transformedResponse[serviceName] = response[serviceName].map(entry => ({
              ...entry,
              date: new Date(entry.date).toLocaleString()
            }));
          }
        }
        return transformedResponse;
      }),
      catchError(this.handleError)
    );
  }

  // Common error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    console.error('Service error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
