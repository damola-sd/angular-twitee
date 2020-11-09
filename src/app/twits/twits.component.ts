import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchTwits, RemoveTwit } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { Twit } from '../twitee';
import { TwiteeServiceService } from '../twitee-service.service';


@Component({
  selector: 'app-twits',
  templateUrl: './twits.component.html',
  styleUrls: ['./twits.component.scss']
})
export class TwitsComponent implements OnInit {

  @Select(TwiteeState.getTwits) twits$: Observable<Twit[]>;
  loggedIn = ""

  constructor( private store: Store, private data: TwiteeServiceService, private router: Router) { 
    this.loggedIn = this.store.selectSnapshot(TwiteeState.token);
    store.dispatch(new FetchTwits())
    
  }

  delete(data: number) {
    this.loggedIn = this.store.selectSnapshot(TwiteeState.token);
    if (this.loggedIn) {
      this.store.dispatch(new RemoveTwit(data)).subscribe(() => {
        this.store.dispatch(new FetchTwits());
      });
    } else {
      alert("You need to be logged in to delete a tweet");
      this.router.navigate(['/login'])

    }
    
    
  }
 

  ngOnInit(): void {
  
  }

}
