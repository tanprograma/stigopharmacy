import { Injectable } from '@angular/core';
import { Unit } from '../unit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UnitService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  units: Unit[] = [];
  url = environment.units_url;
  constructor(private http: HttpClient) {}
  getUnitID(name?: string) {
    return this.units.find((i) => {
      return i.name == name;
    })?._id;
  }
  getUnitName(id?: string) {
    return this.units.find((i) => {
      return i._id == id;
    })?.name;
  }
  getUnits(): Observable<Unit[]> {
    return this.http
      .get<Unit[]>(this.url)
      .pipe(catchError(this.handleError<Unit[]>('couldnt fetch Units', [])));
  }
  postUnit(resource: Unit): Observable<Unit> {
    return this.http
      .post<Unit>(`${this.url}/create`, resource, this.httpOptions)
      .pipe(catchError(this.handleError<Unit>('add Unit')));
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadUnits() {
    if (!this.units.length) {
      this.getUnits().subscribe((i) => {
        this.units = i;
        console.log({ units: i });
      });
      return;
    }
  }
}
