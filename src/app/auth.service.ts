import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Twit } from './twitee';
import { Auth, Token } from './auth';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from './handleError';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://twitee-backend.herokuapp.com/api/user'
  constructor(private http: HttpClient) { }

  register(payload: Auth): Observable<Token> {
    return this.http.post<Token>(this.authUrl + "/register", payload)
      .pipe(
        tap(_ => console.log("Register " + payload)),
        catchError(
          handleError<any>("Register")
        )
      )
  }

  login(payload: Auth): Observable<{ data: Token }> {
    return this.http.post<{ data: Token }>(this.authUrl + "/login", payload)
      .pipe(
        tap(_ => console.log("Login " + payload)),
        catchError(
          handleError<any>("Login")
        )
      )
  }
}
