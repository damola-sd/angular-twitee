import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Store } from '@ngxs/store';
// import { Logout } from './state/twitee.actions';
// import { TwiteeState } from './state/twitee.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-twitee';
  isLoggedIn = '';

  
  constructor() {
    
  }

}
