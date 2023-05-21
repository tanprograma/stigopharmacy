import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commodity } from '../commodity';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommodityService {
  url = environment.commodities_url;
  commodities: Commodity[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getUnitValue(commodity?: string, unit?: string) {
    const units = this.commodities.find((i) => {
      return i.name == commodity;
    })?.units;

    return units?.find((i) => {
      return i.name == unit;
    })?.quantity;
  }
  getSmallestUnit(commodity?: string) {
    const units = this.commodities.find((i) => {
      return i.name == commodity;
    })?.units;

    const unitsNumber = units?.map((i) => {
      return i.quantity;
    });
    const min = Math.min(...(unitsNumber || []));
    return units?.find((i) => {
      return i.quantity == min;
    })?.name;
  }

  getLargestUnit(commodity?: string) {
    const units = this.commodities.find((i) => {
      return i.name == commodity;
    })?.units;

    const unitsNumber = units?.map((i) => {
      return i.quantity;
    });
    const min = Math.min(...(unitsNumber || []));
    return units?.find((i) => {
      return i.quantity == min;
    })?.name;
  }
  getCommodities(): Observable<Commodity[]> {
    return this.http
      .get<Commodity[]>(this.url)
      .pipe(
        catchError(
          this.handleError<Commodity[]>('couldnt fetch commodities', [])
        )
      );
  }
  createCommodities(item: Commodity): Observable<Commodity> {
    return this.http
      .post<Commodity>(`${this.url}/create`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError<Commodity>('couldnt create commodities'))
      );
  }
  activateCommodities(item: {
    commodity: string;
    active: boolean;
  }): Observable<Commodity> {
    return this.http
      .patch<Commodity>(
        `${this.url}/activate/${item.commodity}`,
        { active: item.active },
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Commodity>('couldnt patch commodity')));
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadCommodities() {
    if (!this.commodities.length) {
      this.getCommodities().subscribe((i) => {
        this.commodities = i;

        console.log({ commodity: i });
      });
      return;
    }
  }
}
