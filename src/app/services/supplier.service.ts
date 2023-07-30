import { Injectable } from '@angular/core';

import { Supplier } from '../supplier';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  suppliers: Supplier[] = [];
  url = environment.suppliers_url;
  getSuppliers(): Observable<Supplier[]> {
    console.log({ url: this.url });
    return this.http.get<Supplier[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  createSupplier(supplier: Supplier): Observable<Supplier> {
    console.log({ url: this.url });
    return this.http
      .post<Supplier>(`${this.url}/create`, supplier, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched suppliers');
        }),
        catchError(this.errorHandler<Supplier>('something is wrong'))
      );
  }
  createSuppliers(suppliers: Supplier[]): Observable<Supplier[]> {
    console.log({ url: this.url });
    return this.http
      .post<Supplier[]>(`${this.url}/import`, suppliers, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched suppliers');
        }),
        catchError(this.errorHandler<Supplier[]>('something is wrong'))
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
