import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inventory } from '../inventory';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventories: Inventory[] = [];
  url = environment.inventories_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getInventories(): Observable<Inventory[]> {
    return this.http
      .get<Inventory[]>(this.url)
      .pipe(
        catchError(
          this.handleError<Inventory[]>('couldnt fetch inventories', [])
        )
      );
  }
  getInventoryByStore(store: any): Observable<Inventory[]> {
    return this.http
      .get<Inventory[]>(`${this.url}/stores/${store}`)
      .pipe(
        catchError(
          this.handleError<Inventory[]>('couldnt fetch inventories', [])
        )
      );
  }
  addBeginningStock(item: any): Observable<Inventory[]> {
    return this.http
      .post<Inventory[]>(
        `${this.url}/begginingstock/update/${item.store}`,
        { payload: item.payload },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.handleError<Inventory[]>('couldnt add to beggining', [])
        )
      );
  }
  addBeginningStocks(item: any): Observable<Inventory[]> {
    return this.http
      .post<Inventory[]>(
        `${this.url}/begginingstocks/update`,
        { items: item },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.handleError<Inventory[]>('couldnt add to beggining', [])
        )
      );
  }
  handleError<T>(operation = 'operation', result: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadInventories(item: Inventory[]) {
    if (!this.inventories.length) {
      this.getInventories().subscribe((i) => {
        item = i;
        console.log({ inventories: i });
      });
      return;
    }
    item = this.inventories;
  }
}
