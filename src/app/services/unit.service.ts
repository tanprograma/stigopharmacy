import { Injectable } from '@angular/core';
import { Unit } from '../unit';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UnitService {
  units: Unit[] = [];
  url = environment.units_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getUnits(): Observable<Unit[]> {
    console.log({ url: this.url });
    return this.http.get<Unit[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  createUnit(item: Unit): Observable<Unit> {
    console.log({ url: this.url });
    return this.http
      .post<Unit>(`${this.url}/import`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler<Unit>('something is wrong'))
      );
  }
  createUnits(item: Unit[]): Observable<Unit[]> {
    console.log({ url: this.url });
    return this.http
      .post<Unit[]>(`${this.url}/import`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler<Unit[]>('something is wrong', []))
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
