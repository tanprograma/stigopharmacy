import { Injectable } from '@angular/core';
import { Medicine } from '../medicine';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  medicines: Medicine[] = [];
  url = environment.medicines_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getMedicines(): Observable<Medicine[]> {
    console.log({ url: this.url });
    return this.http.get<Medicine[]>(this.url).pipe(
      tap((_) => {
        console.log('fetched data');
      }),
      catchError(this.errorHandler('something is wrong', []))
    );
  }
  createMedicine(item: Medicine): Observable<Medicine> {
    console.log({ url: this.url });
    return this.http
      .post<Medicine>(`${this.url}/create`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler<Medicine>('something is wrong'))
      );
  }
  createMedicines(item: Medicine[]): Observable<Medicine[]> {
    console.log({ url: this.url });
    return this.http
      .post<Medicine[]>(`${this.url}/import`, item, this.httpOptions)
      .pipe(
        tap((_) => {
          console.log('fetched data');
        }),
        catchError(this.errorHandler<Medicine[]>('something is wrong'))
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
