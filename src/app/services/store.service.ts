import { Injectable } from '@angular/core';
import { Store } from '../store';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  stores: Store[] = [];
  url = environment.stores_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getStores(): Observable<Store[]> {
    console.log({ url: this.url });
    return this.http.get<Store[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  createStores(item: Store[]): Observable<Store[]> {
    console.log({ url: this.url });
    return this.http
      .post<Store[]>(`${this.url}/import`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler<Store[]>('something is wrong', []))
      );
  }
  // setStores(x: Store[]) {
  //   if (this.stores.length) return;
  //   this.getStores().subscribe((i) => {
  //     this.stores = i;
  //     x = i;
  //     console.log(i);
  //   });
  // }
  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) {}
}
