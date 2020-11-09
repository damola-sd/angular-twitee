import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Twit } from './twitee';
import { Auth, Token } from './auth';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://twitee-backend.herokuapp.com/api/user'
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // log to console instead
      window.alert(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  register(payload: Auth): Observable<Token> {
    return this.http.post<Token>(this.authUrl + "/register", payload)
      .pipe(
        tap(_ => console.log("Register " + payload)),
        catchError(
          this.handleError<any>("Register")
        )
      )
  }

  login(payload: Auth): Observable<{ data: Token }> {
    return this.http.post<{ data: Token }>(this.authUrl + "/login", payload)
      .pipe(
        tap(_ => console.log("Login " + payload)),
        catchError(
          this.handleError<any>("Login")
        )
      )
  }
}
