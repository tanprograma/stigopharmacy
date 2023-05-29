import { Injectable } from '@angular/core';
import { Client } from '../client';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  clients: Client[] = [];
  url = environment.clients_url;
  getClients(): Observable<Client[]> {
    console.log({ url: this.url });
    return this.http.get<Client[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  createClient(client: Client): Observable<Client> {
    console.log({ url: this.url });
    return this.http
      .post<Client>(`${this.url}/create`, client, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched clients');
        }),
        catchError(this.errorHandler<Client>('something is wrong'))
      );
  }
  createClients(clients: Client[]): Observable<Client[]> {
    console.log({ url: this.url });
    return this.http
      .post<Client[]>(`${this.url}/import`, clients, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched clients');
        }),
        catchError(this.errorHandler<Client[]>('something is wrong'))
      );
  }

  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) {}
}
