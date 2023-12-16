import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Unit } from '../../shared/interfaces/unit';
import { Idol } from '../../shared/interfaces/idol';
import { ProduceIdol, SupportCharacter } from '../../shared/interfaces/common';
import { CharacterAlbumMetadata } from '../../shared/interfaces/album';

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

  getIdolCardList(IdolID: number): Observable<CharacterAlbumMetadata> {
    return this.http
      .get<CharacterAlbumMetadata>(`${environment.api2Url}album/${IdolID}`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError<CharacterAlbumMetadata>('getIdolCardList')));
  }

  getProduceInfo(cardId: number): Observable<ProduceIdol> {
    return this.http
      .get<ProduceIdol>(`${environment.api2Url}produceIdol/${cardId}`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError<ProduceIdol>('getProduceInfo')));
  }

  getSupportInfo(cardId: number): Observable<SupportCharacter> {
    return this.http
      .get<SupportCharacter>(`${environment.api2Url}supportCharacter/${cardId}`, {
        responseType: 'json',
      })
      .pipe(catchError(this.handleError<SupportCharacter>('getSupportInfo')));
  }
}
