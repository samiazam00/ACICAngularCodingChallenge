import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LineOfBusiness } from './LineOfBusiness';
import { LineOfBusinessQuote } from './LineOfBusinessQuote';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class LineOfBusinessService {

  private lineOfBusinessUrl = 'api/linesOfBusiness';  // URL to web api
  private lineOfBusinessQuoteUrl = 'api/recentQuotes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET lines of business from the server */
  getLinesOfBusiness(): Observable<LineOfBusiness[]> {
    return this.http.get<LineOfBusiness[]>(this.lineOfBusinessUrl)
      .pipe(
        tap(_ => this.log('fetched lines of business')),
        catchError(this.handleError<LineOfBusiness[]>('getLinesOfBusiness', []))
      );
  }

  // Next two methods should ideally be moved in a separate service that would also contain implementation for Quotes CRUD operations
  // However, since we don`t do CRUD operations with Quotes in this test project, just adding them here for convenience

  /** GET lines of business quotes from the server */
  getRecentQuotes(): Observable<LineOfBusinessQuote[]> {
    return this.http.get<LineOfBusinessQuote[]>(this.lineOfBusinessQuoteUrl)
      .pipe(
        tap(_ => this.log('fetched lines of business quotes')),
        catchError(this.handleError<LineOfBusinessQuote[]>('getRecentQuotes', []))
      );
  }

  /** GET Quotes by its line of business by id. Will 404 if id not found */
  getQuotesByLineOfBusinessId(id: number): Observable<LineOfBusinessQuote[]> {
    const url = `${this.lineOfBusinessQuoteUrl}/?lineOfBusiness=${id}`;
    return this.http.get<LineOfBusinessQuote[]>(url).pipe(
      tap(_ => this.log(`fetched Quote for lineOfBusiness id=${id}`)),
      catchError(this.handleError<LineOfBusinessQuote[]>(`getQuotesByLineOfBusinessId id=${id}`))
    );
  }

  /** GET line of business by id. Return `undefined` when id not found */
  getLineOfBusinessNo404<Data>(id: number): Observable<LineOfBusiness> {
    const url = `${this.lineOfBusinessUrl}/?id=${id}`;
    return this.http.get<LineOfBusiness[]>(url)
      .pipe(
        map(linesOfBusiness => linesOfBusiness[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} lineOfBusiness id=${id}`);
        }),
        catchError(this.handleError<LineOfBusiness>(`getLineOfBusiness id=${id}`))
      );
  }

  /** GET line of business by id. Will 404 if id not found */
  getLineOfBusiness(id: number): Observable<LineOfBusiness> {
    const url = `${this.lineOfBusinessUrl}/${id}`;
    return this.http.get<LineOfBusiness>(url).pipe(
      tap(_ => this.log(`fetched lineOfBusiness id=${id}`)),
      catchError(this.handleError<LineOfBusiness>(`getLineOfBusiness id=${id}`))
    );
  }

  /* GET lines of business whose name contains search term */
  searchLinesOfBusiness(term: string): Observable<LineOfBusiness[]> {
    if (!term.trim()) {
      // if not search term, return empty line of business array.
      return of([]);
    }
    return this.http.get<LineOfBusiness[]>(`${this.lineOfBusinessUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found line of business matching "${term}"`) :
         this.log(`no lines of business matching "${term}"`)),
      catchError(this.handleError<LineOfBusiness[]>('searchLinesOfBusiness', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new line of business to the server */
  addLineOfBusiness(lineOfBusiness: LineOfBusiness): Observable<LineOfBusiness> {
    return this.http.post<LineOfBusiness>(this.lineOfBusinessUrl, lineOfBusiness, this.httpOptions).pipe(
      tap((newLineOfBusiness: LineOfBusiness) => this.log(`added line of business w/ id=${newLineOfBusiness.id}`)),
      catchError(this.handleError<LineOfBusiness>('addLineOfBusiness'))
    );
  }

  /** DELETE: delete the line of business from the server */
  deleteLineOfBusiness(id: number): Observable<LineOfBusiness> {
    const url = `${this.lineOfBusinessUrl}/${id}`;

    return this.http.delete<LineOfBusiness>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted line of business id=${id}`)),
      catchError(this.handleError<LineOfBusiness>('deleteLineOfBusiness'))
    );
  }

  /** PUT: update the line of business on the server */
  updateLineOfBusiness(lineOfBusiness: LineOfBusiness): Observable<any> {
    return this.http.put(this.lineOfBusinessUrl, lineOfBusiness, this.httpOptions).pipe(
      tap(_ => this.log(`updated line of business id=${lineOfBusiness.id}`)),
      catchError(this.handleError<any>('updateLineOfBusiness'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a LineOfBusinessService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LineOfBusinessService: ${message}`);
  }
}
