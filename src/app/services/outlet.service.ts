import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Outlet } from '../outlet';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OutletService {
  stores: Outlet[] = [];
  getStoreName(id?: string) {
    return this.stores.find((i) => {
      return i._id == id;
    })?.name;
  }
  getStoreID(name?: string) {
    return this.stores.find((i) => {
      return i.name == name;
    })?._id;
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url = environment.stores_url;
  constructor(private http: HttpClient) {}
  getOutlets(): Observable<Outlet[]> {
    return this.http
      .get<Outlet[]>(this.url)
      .pipe(
        catchError(this.handleError<Outlet[]>('couldnt fetch inventories', []))
      );
  }
  postOutlet(item: Outlet): Observable<Outlet> {
    return this.http
      .post<Outlet>(`${this.url}/create`, item, this.httpOptions)
      .pipe(catchError(this.handleError<Outlet>('couldnt fetch inventories')));
  }
  postOutlets(items: Outlet[]): Observable<Outlet[]> {
    return this.http
      .post<Outlet[]>(`${this.url}/create/many`, items, this.httpOptions)
      .pipe(catchError(this.handleError<Outlet[]>('couldnt create stores')));
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.log(operation);
      return of(result as T);
    };
  }
  loadStores() {
    if (!this.stores.length) {
      this.getOutlets().subscribe((i) => {
        this.stores = i;
        console.log({ stores: i });
      });
      return;
    }
  }
}
