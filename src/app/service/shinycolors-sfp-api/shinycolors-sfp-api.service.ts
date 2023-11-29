import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Unit } from '../../shared/interfaces/unit';
import { Idol } from '../../shared/interfaces/idol';

@Injectable({
  providedIn: 'root',
})
export class ShinyColorsSfpAPIService {

  constructor(
    private http: HttpClient,
    private router: Router,) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.status);
      console.log(`${operation} failed: ${error.message}`);
      this.router.navigate(['/notfound']);
      return of(result as T);
    };
  }

  getUnitList(): Observable<Unit[]> {
    return this.http
      .get<Unit[]>(`${environment.apiUrl}info/unitInfo`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError<Unit[]>('getIdolList', [])));
  }

  getIdolInfo(idolID: number): Observable<Idol> {
    return this.http
      .get<Idol>(`${environment.apiUrl}info/idolInfo?idolId=${idolID}`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError<Idol>('getIdolInfo')));
  }
}
