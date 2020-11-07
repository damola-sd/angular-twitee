import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Auth } from '../auth';
import { Login } from '../state/twitee.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  login(data: Auth) {
    this.store.dispatch(new Login(data))
  }

  ngOnInit(): void {
  }

}
