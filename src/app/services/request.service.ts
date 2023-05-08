import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Prescription } from '../prescription';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requests: Prescription[] = [];
  url = environment.requests_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getRequests(): Observable<Prescription[]> {
    return this.http
      .get<Prescription[]>(this.url)
      .pipe(
        catchError(
          this.handleError<Prescription[]>('couldnt fetch Prescriptions', [])
        )
      );
  }
  getRequestsByHost(id?: any): Observable<Prescription[]> {
    return this.http
      .get<Prescription[]>(`${this.url}/unissued/${id}`)
      .pipe(
        catchError(
          this.handleError<Prescription[]>('couldnt fetch Prescriptions', [])
        )
      );
  }
  getStoreUnissuedRequests(store: string): Observable<Prescription[]> {
    return this.http
      .get<Prescription[]>(`${this.url}/?host=${store}&isIssued=false`)
      .pipe(
        catchError(
          this.handleError<Prescription[]>('couldnt fetch Prescriptions', [])
        )
      );
  }
  postRequest(client: Prescription): Observable<Prescription> {
    return this.http
      .post<Prescription>(`${this.url}/create`, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Prescription>('couldnt fetch clients'))
      );
  }
  issueRequest(req: {
    id: string;
    req: {
      commodity: string;
      issued: number;
      requested: number;
      unit: string;
    }[];
  }): Observable<Prescription> {
    return this.http
      .patch<Prescription>(
        `${this.url}/update/${req.id}`,
        req.req,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError<Prescription>('couldnt update client'))
      );
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadRequests() {
    if (!this.requests.length) {
      this.getRequests().subscribe((i) => {
        this.requests = i;
        console.log({ requests: i });
      });
    }
  }
  loadRequestsByHost(host: any) {
    if (!this.requests.length) {
      this.getRequestsByHost(host).subscribe((i) => {
        this.requests = i;
        console.log({ requests: i });
      });
    }
  }
}
