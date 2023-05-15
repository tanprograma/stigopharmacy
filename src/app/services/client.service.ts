import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = environment.clients_url;
  clients: Client[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getClientName(id: string) {
    return this.clients.find((i) => {
      return i._id == id;
    })?.name;
  }
  getClientID(name: string) {
    return this.clients.find((i) => {
      return i.name == name;
    })?._id;
  }
  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.url)
      .pipe(
        catchError(this.handleError<Client[]>('couldnt fetch clients', []))
      );
  }
  postClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(`${this.url}/create`, client, this.httpOptions)
      .pipe(catchError(this.handleError<Client>('couldnt fetch clients')));
  }
  postClients(client: Client[]): Observable<Client[]> {
    return this.http
      .post<Client[]>(`${this.url}/create/many`, client, this.httpOptions)
      .pipe(catchError(this.handleError<Client[]>('couldnt fetch clients')));
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadClients() {
    if (!this.clients.length) {
      this.getClients().subscribe((i) => {
        this.clients = i;
        console.log({ clients: i });
      });
      return;
    }
  }
}
