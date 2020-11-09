import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from '../auth';
import { Register } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loggedIn;
  constructor(private store: Store, private router: Router) {
    this.loggedIn = this.store.selectSnapshot(TwiteeState.isAuthenticated);
  }

  register(data: Auth) {
    this.store.dispatch(new Register(data)).subscribe(() => {
      this.router.navigate([""]);

    })
  }

  ngOnInit(): void {
  }

}
