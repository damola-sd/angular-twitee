import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddTwit, FetchTwits } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { Twit } from '../twitee';

@Component({
  selector: 'app-post-twit',
  templateUrl: './post-twit.component.html',
  styleUrls: ['./post-twit.component.scss']
})
export class PostTwitComponent implements OnInit {

  isLoggedIn = '';

  constructor(private store: Store, private router: Router) { }

  post(data: Twit) {
    this.isLoggedIn = this.store.selectSnapshot(TwiteeState.token);
    if (this.isLoggedIn) {
      this.store.dispatch(new AddTwit(data)).subscribe(() => {
        this.store.dispatch(new FetchTwits());
      });
    } else {
      alert("You need to be logged in to post a twit");
      this.router.navigate(["/login"]);
    }


  }

  ngOnInit(): void {
  }

}
