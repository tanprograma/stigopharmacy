import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prescription } from '../prescription';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url = environment.dispensed_url;
  constructor(private http: HttpClient) {}
  getPrescriptions(): Observable<Prescription[]> {
    return this.http
      .get<Prescription[]>(this.url)
      .pipe(
        catchError(
          this.handleError<Prescription[]>('couldnt fetch prescriptions', [])
        )
      );
  }
  postPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http
      .post<Prescription>(`${this.url}/create`, prescription)
      .pipe(
        catchError(
          this.handleError<Prescription>('couldnt fetch prescriptions')
        )
      );
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
}
