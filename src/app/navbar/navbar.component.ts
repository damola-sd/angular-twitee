import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = '';

  logout() {
    this.store.dispatch(new Logout()).subscribe(() => {
      this.document.location.reload();
    })
  }
  constructor(private store: Store, private router: Router, @Inject(DOCUMENT) private document: Document) { 
    this.isLoggedIn = this.store.selectSnapshot(TwiteeState.token);
  }

  ngOnInit(): void {
  }

}
