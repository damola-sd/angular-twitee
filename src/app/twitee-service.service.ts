import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Twit } from './twitee'
import { TwiteeStateModel } from './state/twitee.state';

@Injectable({
  providedIn: 'root'
})
export class TwiteeServiceService {
  private twitsUrl = 'https://twitee-backend.herokuapp.com'

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getTwits() {
    return this.http.get<{data: Twit[]}>(this.twitsUrl + "/api/twit")
  }



  // addTwit(payload: Twit) {
  //   return this.http.post<Twit>
  // }

  
}
