import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Twit } from './twitee'
import { TwiteeStateModel, TwiteeState } from './state/twitee.state';
import { Store } from '@ngxs/store';
import { handleError } from './handleError';

@Injectable({
  providedIn: 'root'
})
export class TwiteeServiceService {
  private twitsUrl = 'https://twitee-backend.herokuapp.com'

  constructor(private http: HttpClient, private store: Store) {
  }

  getToken(): string {
    return localStorage.getItem('twits.token');
  }



  getTwits() {
    return this.http.get<{ data: Twit[] }>(this.twitsUrl + "/api/twit")
    .pipe(
      tap(_ => console.log("Fetch Twits ")),
      catchError(
        handleError<any>("Fetch Twits")
      )
    )
  }






  addTwit(payload: Twit) {
    const token = this.store.selectSnapshot(TwiteeState.token);
    const httpOtions = {
      headers: new HttpHeaders({
        token
      })
    };
    return this.http.post<{ data: Twit[] }>(this.twitsUrl + "/api/twit/new", payload, httpOtions)
      .pipe(
        tap(_ => console.log("Posting twit " + payload)),
        catchError(
          handleError<any>("Post Twit")
        )
      )
  }

  deleteTwit(payload: number) {
    const token = this.store.selectSnapshot(TwiteeState.token);
    const httpOtions = {
      headers: new HttpHeaders({
        token
      })
    };
    return this.http.delete<{ data: string }>(this.twitsUrl + "/api/twit/" + payload, httpOtions)
      .pipe(
        tap(_ => console.log("Delete twit id " + payload)),
        catchError(
          handleError<any>("Delete Twit")
        )
      )
  }


}
