import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine } from '../medicine';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MedicinesService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url = environment.medicines_url;
  medicines: Medicine[] = [];
  constructor(private http: HttpClient) {}
  getMedicineName(id?: string) {
    return this.medicines.find((i) => {
      return i._id == id;
    })?.name;
  }
  getMedicineID(name?: string) {
    return this.medicines.find((i) => {
      return i.name == name;
    })?._id;
  }
  getMedicines(): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.url)
      .pipe(
        catchError(this.handleError<Medicine[]>('couldnt fetch medicines', []))
      );
  }
  createMedicine(resource: Medicine): Observable<Medicine> {
    return this.http
      .post<Medicine>(`${this.url}/create`, resource, this.httpOptions)
      .pipe(catchError(this.handleError<Medicine>('add medicine')));
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadMedicines() {
    if (!this.medicines.length) {
      this.getMedicines().subscribe((i) => {
        this.medicines = i;

        console.log({ medicines: i });
      });
      return;
    }
  }
}
